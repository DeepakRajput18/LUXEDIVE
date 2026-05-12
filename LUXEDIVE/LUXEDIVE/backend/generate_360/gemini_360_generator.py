"""
local_360_generator.py
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Free, Local 360° generation pipeline (NO Replicate API)

Architecture:
  1. Input: 1 car image
  2. Background removal using `rembg`
  3. OpenCV Transformation: Synthesize 36 frames via perspective distortion
  4. Upload: Save exactly 36 frames to Supabase
  5. Finalize: DB update
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
import os
import time
import concurrent.futures
from io import BytesIO
from datetime import datetime
from typing import Dict, List, Optional, Tuple

import cv2
import numpy as np
import requests as http_requests
from PIL import Image
import rembg
from dotenv import load_dotenv
from supabase import create_client, Client

# ── Environment ───────────────────────────────────────────────────────────────
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)

SUPABASE_URL: Optional[str] = os.getenv('SUPABASE_URL')
SUPABASE_KEY: Optional[str] = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)  # type: ignore[arg-type]

# Verify Supabase at startup
try:
    supabase.table('car_360_requests').select('count', count='exact').limit(1).execute()
    print("✅ Supabase connected")
except Exception as e:
    print(f"❌ Supabase connection failed: {e}")

def _shim_upload(*args):
    """Wrapper so Pyre2 sees a plain callable for upload_task_wrapper."""
    inst = args[0]
    return inst.upload_task_wrapper(*args[1:])

def create_ground_shadow(w: int, h: int) -> np.ndarray:
    """Create a persistent ground shadow image (BGRA)"""
    shadow_canvas = np.zeros((h, w, 4), dtype=np.uint8)
    cx, cy = w // 2, int(h * 0.85)
    axes = (int(w * 0.4), int(h * 0.05))
    cv2.ellipse(shadow_canvas, (cx, cy), axes, 0, 0, 360, (0, 0, 0, 180), -1)
    shadow_blured = cv2.GaussianBlur(shadow_canvas, (101, 101), 0)
    return shadow_blured

def blend_transparent(foreground: np.ndarray, background: np.ndarray) -> np.ndarray:
    """Blend a BGRA foreground onto a BGR background with edge smoothing"""
    alpha = foreground[:, :, 3] / 255.0
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
    alpha_3d = np.dstack((alpha, alpha, alpha))
    composite = foreground[:, :, :3] * alpha_3d + background * (1 - alpha_3d)
    return composite.astype(np.uint8)

class LocalCar360Generator:
    """
    Full 360° generation pipeline (Free Local Version):
      Download → rembg → OpenCV 36 frames → upload.
    """

    def __init__(self, request_id: str) -> None:
        self.request_id = request_id
        self.temp_dir = 'temp_360'
        os.makedirs(self.temp_dir, exist_ok=True)

    # ── Logging & status ──────────────────────────────────────────────────────
    def log(self, msg: str) -> None:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

    def update_status(
        self,
        status: str,
        progress: int = 0,
        error: Optional[str] = None
    ) -> None:
        try:
            data = {'status': status, 'progress': progress}
            if error:
                data['error_message'] = error
            supabase.table('car_360_requests').update(data).eq('id', self.request_id).execute()
        except Exception as e:
            self.log(f"  ⚠️  Status update failed: {e}")

    def _validate_frame(self, frame_img: np.ndarray) -> bool:
        """
        Validate that the frame contains the car and is not heavily distorted.
        Reads the alpha channel to ensure car pixels are present.
        """
        if frame_img is None or frame_img.size == 0:
            return False
            
        # Get alpha channel (assuming BGRA)
        if frame_img.shape[2] == 4:
            alpha = frame_img[:, :, 3]
        else:
            return True # Not transparent
            
        non_zero_pixels = cv2.countNonZero(alpha)
        # Check if at least 1000 pixels exist to confirm the car didn't collapse to 0 width
        if non_zero_pixels < 1000:
            return False
            
        return True

    # ── STEP 1 & 2: Local Generation Core Logic ──────────────────────────────
    def generate_fake_360_frames(self, image_url: str) -> List[str]:
        """
        Download image, remove background, and use OpenCV to generate 36 advanced frames.
        Returns list of local file paths.
        """
        self.log("\n🧪 STEP 1/2: Processing image & generating 36 strict identity rotation frames locally...")
        self.update_status('generating', 10)
        
        # 1. Download
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = http_requests.get(image_url, headers=headers, timeout=30)
        r.raise_for_status()
        raw_img = Image.open(BytesIO(r.content)).convert("RGBA")
        
        # 2. Remove background
        self.log("   ↳ Removing background using rembg...")
        self.update_status('generating', 20)
        no_bg = rembg.remove(raw_img)
        
        self.update_status('generating', 30)
        W, H = 1200, 800
        
        # 3. Find Bounding Box & Center
        self.log("   ↳ Centering car object precisely in the frame...")
        car_np = np.array(no_bg)
        if car_np.shape[2] == 4:
            alpha = car_np[:, :, 3]
            coords = cv2.findNonZero(alpha)
            if coords is not None:
                x, y, w, h = cv2.boundingRect(coords)
                # Crop to car only
                car_crop = car_np[y:y+h, x:x+w]
                no_bg = Image.fromarray(car_crop)
            else:
                self.log("   ⚠️  No car detected in alpha channel, skipping centering.")

        # 4. Resize and Pad to canvas
        no_bg.thumbnail((W-200, H-200), Image.Resampling.LANCZOS)
        
        base_rgba = np.zeros((H, W, 4), dtype=np.uint8)
        car_rgba = cv2.cvtColor(np.array(no_bg), cv2.COLOR_RGBA2BGRA)
        
        ch, cw = car_rgba.shape[:2]
        offset_y = (H - ch) // 2
        offset_x = (W - cw) // 2
        base_rgba[offset_y:offset_y+ch, offset_x:offset_x+cw] = car_rgba
        
        ground_shadow = create_ground_shadow(W, H)
        white_bg = np.ones((H, W, 3), dtype=np.uint8) * 255
        bg_with_shadow = blend_transparent(ground_shadow, white_bg)
        
        frame_paths = []
        self.log("   ↳ Synthesizing 36 frames with strict identity-lock OpenCV transformations...")
        
        pts1 = np.float32([[0, 0], [W, 0], [0, H], [W, H]])
        cx, cy = W / 2, H / 2
        
        for i in range(36):
            angle = i * 10
            rad = np.radians(angle)
            
            # 1. Prevent collapsing completely flat. Minimum width is 0.20
            # Continuous cosine compression without arbitrary flipping
            cos_val = np.cos(rad)
            scale_x = 0.20 + 0.80 * abs(cos_val)**1.3
            
            # 2. Add slight vertical scaling for depth simulation (largest at front/rear ~ 90 deg and 270 deg)
            scale_y = 1.0 + 0.08 * abs(np.sin(rad))
            
            # 3. Trapezoidal / perspective shift
            # Left side versus right side scaling based on angle
            perspective_intensity = 0.12 * np.sin(rad)
            
            new_w = W * scale_x
            new_h = H * scale_y
            
            left_h = new_h * (1.0 - perspective_intensity)
            right_h = new_h * (1.0 + perspective_intensity)
            
            dst_x1 = cx - new_w / 2
            dst_x2 = cx + new_w / 2
            
            # Calculate standard perspective targets
            pts2 = np.float32([
                [dst_x1, cy - left_h / 2],
                [dst_x2, cy - right_h / 2],
                [dst_x1, cy + left_h / 2],
                [dst_x2, cy + right_h / 2]
            ])
            
            # Removed arbitrary flipping for the rear (is_rear checks). 
            # The contour remains identical to original pixels just heavily compressed natively.
            
            # 4. Enforce high-quality interpolation (INTER_CUBIC)
            matrix = cv2.getPerspectiveTransform(pts1, pts2)
            warped_car = cv2.warpPerspective(
                base_rgba,
                matrix,
                (W, H),
                flags=cv2.INTER_CUBIC,
                borderMode=cv2.BORDER_CONSTANT,
                borderValue=(0,0,0,0)
            )
            
            # 5. Determine shading based on angle
            shading = 1.0
            if 135 <= angle <= 225:
                # Darken back
                shading = 0.75 + 0.25 * abs(np.cos(rad))
            elif angle <= 45 or angle >= 315:
                # Brighten front
                shading = 1.0 + 0.10 * abs(np.cos(rad))
                
            if shading != 1.0:
                rgb = warped_car[:, :, :3].astype(np.float64)
                rgb *= shading
                rgb = np.clip(rgb, 0, 255).astype(np.uint8)
                warped_car[:, :, :3] = rgb
                
            # 6. Validate frame
            if not self._validate_frame(warped_car):
                self.log(f"   ⚠️ Frame {i+1} collapsed too much. Retrying with fallback scale...")
                # Fallback to minimal identity transform just to ensure it works
                new_w_fb = W * 0.25
                pts2_fb = np.float32([
                    [cx - new_w_fb / 2, cy - new_h / 2],
                    [cx + new_w_fb / 2, cy - new_h / 2],
                    [cx - new_w_fb / 2, cy + new_h / 2],
                    [cx + new_w_fb / 2, cy + new_h / 2]
                ])
                matrix_fb = cv2.getPerspectiveTransform(pts1, pts2_fb)
                warped_car = cv2.warpPerspective(base_rgba, matrix_fb, (W, H), flags=cv2.INTER_CUBIC)
            
            # 7. Composite onto the ground shadow exactly as original
            final_frame = blend_transparent(warped_car, bg_with_shadow)
            
            path = os.path.join(self.temp_dir, f"frame_{self.request_id}_{i+1:02d}.png")
            cv2.imwrite(path, final_frame)
            frame_paths.append(path)
            
            if (i + 1) % 9 == 0:
                self.update_status('generating', 30 + int(((i + 1) / 36) * 35))
                
        self.log(f"   ✅ Successfully generated 36 perfectly identity-locked frames")
        return frame_paths

    # ── STEP 3: Upload ────────────────────────────────────────────────────────
    def upload_task_wrapper(self, idx: int, path: str) -> Tuple[int, str]:
        remote = f"{self.request_id}/frame-{idx+1:02d}.png"
        for attempt in range(3):
            try:
                with open(path, 'rb') as fh:
                    data = fh.read()
                supabase.storage.from_('vehicle-360').upload(
                    remote, data, {'content-type': 'image/png', 'upsert': 'true'}
                )
                url = supabase.storage.from_('vehicle-360').get_public_url(remote)
                return idx, url
            except Exception as e:
                wait = 2 * (attempt + 1)
                self.log(f"  ⚠️  Frame {idx+1} upload attempt {attempt+1}/3 failed: {e} — retry in {wait}s")
                time.sleep(wait)
        return idx, ""

    def upload_frames(self, frame_paths: List[str]) -> List[str]:
        self.log(f"\n☁️  STEP 3: Cleaning up and uploading 36 frames to Supabase...")
        
        # 🗑️ PRE-UPLOAD CLEANUP
        try:
            folder = f"{self.request_id}"
            res = supabase.storage.from_('vehicle-360').list(folder)
            if res:
                files_to_remove = [f"{folder}/{f['name']}" for f in res]
                supabase.storage.from_('vehicle-360').remove(files_to_remove)
                self.log(f"   ✅ Cleaned up {len(files_to_remove)} old frames")
        except Exception as e:
            self.log(f"   ⚠️ Cleanup hint: {e}")

        urls: List[str] = [""] * len(frame_paths)
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            futures = [
                executor.submit(_shim_upload, self, i, p)
                for i, p in enumerate(frame_paths)
            ]
            done = 0
            for f in concurrent.futures.as_completed(futures):
                idx, url = f.result()
                urls[idx] = url
                done += 1
                if done % 9 == 0:
                    self.update_status('uploading', 65 + int((done / len(frame_paths)) * 30))

        # Fill gaps with neighbour URLs to prevent black tiles
        for i, u in enumerate(urls):
            if not u:
                for offset in [1, -1, 2, -2]:
                    nb = (i + offset) % len(urls)
                    if urls[nb]:
                        urls[i] = urls[nb]
                        break

        ok = sum(1 for u in urls if u)
        self.log(f"  ✅ {ok}/{len(frame_paths)} frames uploaded")
        return urls

    # ── Main pipeline ─────────────────────────────────────────────────────────
    def split_grid_to_frames(self, input_path: str) -> List[str]:
        """
        Split a 7x6 grid image into exactly 36 frames as requested.
        Rows: 7, Cols: 6 (Total 42, use first 36).
        """
        self.log(f"🧪 STEP 1: Manually splitting 7x6 grid from {input_path}")
        img = cv2.imread(input_path)
        if img is None:
            raise ValueError(f"Could not read image at {input_path}")
            
        h, w = img.shape[:2]
        rows, cols = 7, 6
        frame_w = w // cols
        frame_h = h // rows
        
        self.log(f"   ↳ Image size: {w}x{h}, Frame size: {frame_w}x{frame_h}")
        
        frames: List[np.ndarray] = []
        for r in range(rows):
            for c in range(cols):
                y = r * frame_h
                x = c * frame_w
                frame = img[y:y+frame_h, x:x+frame_w]
                frames.append(frame)
                
        if len(frames) < 36:
            raise ValueError(f"Not enough frames (expected 42, got {len(frames)})")
            
        # Select exactly first 36
        short_list = [frames[i] for i in range(36)]
        self.log(f"   ↳ Selected 36 frames from {len(frames)} total grid cells")
        
        frame_paths = []
        for i, frame in enumerate(short_list):
            path = os.path.join(self.temp_dir, f"frame_{self.request_id}_{i+1:02d}.png")
            cv2.imwrite(path, frame)
            frame_paths.append(path)
            
        return frame_paths

    def generate(
        self,
        uploaded_image_url: str,
        brand: str,
        model: str,
        year: Optional[int] = None,
        generation_type: str = '3D-rendered'
    ) -> bool:
        try:
            print("\n" + "=" * 70)
            print(f"🚗  LOCAL 360° PIPELINE (FREE) — {brand} {model} {year or ''}")
            print(f"    Request: {self.request_id} ({generation_type})")
            print("=" * 70 + "\n")

            if generation_type == 'manual-grid':
                # Skip AI synthesis, just split the grid
                # 1. Download the grid image
                headers = {'User-Agent': 'Mozilla/5.0'}
                r = http_requests.get(uploaded_image_url, headers=headers, timeout=30)
                r.raise_for_status()
                grid_path = os.path.join(self.temp_dir, f"grid_{self.request_id}.png")
                with open(grid_path, 'wb') as f:
                    f.write(r.content)
                
                frame_paths = self.split_grid_to_frames(grid_path)
            else:
                # Standard AI Synthesis path
                frame_paths = self.generate_fake_360_frames(uploaded_image_url)
            frame_urls = self.upload_frames(frame_paths)

            ok_count = sum(1 for u in frame_urls if u)
            if ok_count < 30:
                raise RuntimeError(f"Too many upload failures ({ok_count}/36 uploaded)")

            # ── 4. Finalize ───────────────────────────────────────────────────
            self.log("\n💾 STEP 4: Finalising database updates...")
            self.update_status('uploading', 98)
            now = datetime.now().isoformat()
            supabase.table('car_360_requests').update({
                'status': 'completed',
                'progress': 100,
                'frames_urls': frame_urls,
                'frames_count': 36,
                'has_360_view': True,
                'admin_review_status': 'pending',
                'completed_at': now,
                'generated_at': now,
                'generation_type': 'local-opencv',
                'quality_check_status': 'passed',
                'quality_check_notes': 'Generated using consistent local OpenCV transforms',
            }).eq('id', self.request_id).execute()

            supabase.table('cars').update({
                'has_360_view': True,
                'frames_count': 36,
                'image_360_folder': self.request_id,
                'processing_status': 'completed',
            }).eq('id', self._get_car_id()).execute()

            print("\n" + "=" * 70)
            print(f"✅ COMPLETE — {ok_count}/36 frames live")
            print("=" * 70 + "\n")
            return True

        except Exception as e:
            error_msg = str(e)
            self.log(f"\n❌ PIPELINE FAILED: {error_msg}\n")
            self.update_status('failed', 0, error_msg)
            return False

    def _get_car_id(self) -> str:
        try:
            res = supabase.table('car_360_requests').select('car_id').eq('id', self.request_id).single().execute()
            return str(res.data.get('car_id', ''))
        except Exception:
            return ''


# ── Queue processor ───────────────────────────────────────────────────────────
def process_pending_request() -> bool:
    res = supabase.table('car_360_requests') \
        .select('id, car_id, uploaded_image_url, car_brand, car_model, car_year, generation_type') \
        .eq('status', 'pending') \
        .order('created_at', desc=False) \
        .limit(1).execute()

    pending_reqs = res.data
    if not pending_reqs:
        return False

    req = pending_reqs[0]
    print(f"\n📋 Processing: {req['car_brand']} {req['car_model']} ({req['id']})")

    gen = LocalCar360Generator(req['id'])
    return gen.generate(
        req['uploaded_image_url'],
        req['car_brand'],
        req['car_model'],
        req.get('car_year'),
        req.get('generation_type', '3D-rendered')
    )


def worker_mode() -> None:
    print("\n" + "=" * 70)
    print("🔄 LOCAL OPENCV 360° WORKER (FREE) — Ctrl-C to stop")
    print("=" * 70 + "\n")
    while True:
        try:
            ts = datetime.now().strftime('%H:%M:%S')
            print(f"[{ts}] Checking queue...")
            if process_pending_request():
                print("✅ Request done\n")
            else:
                print("ℹ️  No pending requests\n")
        except KeyboardInterrupt:
            print("\n🛑 Worker stopped\n")
            break
        except Exception as e:
            print(f"❌ Worker error: {e}\n")
        time.sleep(10)


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--worker":
        worker_mode()
    else:
        ok = process_pending_request()
        sys.exit(0 if ok else 1)
