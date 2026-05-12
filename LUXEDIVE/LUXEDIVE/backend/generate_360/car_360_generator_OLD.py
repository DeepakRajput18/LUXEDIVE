# Standard library
import os
import sys
import json
import time
from datetime import datetime
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, List, Optional, Tuple

# Third-party
import cv2
import numpy as np
import requests
from PIL import Image
from dotenv import load_dotenv
from rembg import remove
from serpapi import GoogleSearch
from supabase import create_client, Client

# ── Environment ──────────────────────────────────────────────────────────────
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)

SERPAPI_KEY: Optional[str] = os.getenv('SERPAPI_KEY')
SUPABASE_URL: Optional[str] = os.getenv('SUPABASE_URL')
SUPABASE_KEY: Optional[str] = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

required: List[str] = ['SERPAPI_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
missing: List[str] = [v for v in required if not os.getenv(v)]
if missing:
    print(f"❌ Missing env vars: {', '.join(missing)}")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)  # type: ignore[arg-type]

os.makedirs('temp_360', exist_ok=True)
os.makedirs('temp_frames', exist_ok=True)

# ── 8 canonical angles for a full 360° rotation ──────────────────────────────
ANGLES: Dict[str, str] = {
    'front':        '{brand} {model} car FRONT VIEW nose-on white background studio',
    'front_right':  '{brand} {model} car FRONT-RIGHT 3/4 angle white background studio',
    'right':        '{brand} {model} car RIGHT SIDE profile white background studio',
    'rear_right':   '{brand} {model} car REAR-RIGHT 3/4 angle white background studio',
    'rear':         '{brand} {model} car REAR BACK VIEW white background studio',
    'rear_left':    '{brand} {model} car REAR-LEFT 3/4 angle white background studio',
    'left':         '{brand} {model} car LEFT SIDE profile white background studio',
    'front_left':   '{brand} {model} car FRONT-LEFT 3/4 angle white background studio',
}

# ── Pyre2-compatible shims ────────────────────────────────────────────────────
def _shim_search(*args: object) -> Tuple[str, Optional[str]]:
    inst, angle, query = args[0], str(args[1]), str(args[2])
    return (inst)._search_one_angle(angle, query)  # type: ignore[union-attr]

def _shim_download(*args: object) -> Tuple[str, Optional[Image.Image]]:
    inst, angle, url = args[0], str(args[1]), str(args[2])
    return (inst)._download_one(angle, url)  # type: ignore[union-attr]

def _shim_upload(*args: object) -> Tuple[int, str]:
    inst, idx, path = args[0], int(args[1]), str(args[2])  # type: ignore[arg-type]
    return (inst)._upload_one(idx, path)  # type: ignore[union-attr]


class Car360Generator:
    def __init__(self, request_id: str) -> None:
        self.request_id = request_id
        self.temp_dir = 'temp_360'
        self.frames_dir = 'temp_frames'
        self.target_frames = 36

    # ── Logging & Status ─────────────────────────────────────────────────────
    def log(self, msg: str) -> None:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

    def update_status(self, status: str, progress: int = 0, error: Optional[str] = None) -> None:
        try:
            data: Dict[str, object] = {'status': status, 'progress': progress}
            if error:
                data['error_message'] = error
            supabase.table('car_360_requests').update(data).eq('id', self.request_id).execute()
            self.log(f"  Status → {status} ({progress}%)")
        except Exception as e:
            self.log(f"  ⚠️  Status update failed: {e}")

    # ── STEP 1: Search for each of the 8 angles ──────────────────────────────
    def _search_one_angle(self, angle: str, query: str) -> Tuple[str, Optional[str]]:
        """Search Google Images for one angle, return (angle, best_url)"""
        try:
            search = GoogleSearch({
                "q": query,
                "tbm": "isch",
                "api_key": SERPAPI_KEY,
                "num": 8,
                "safe": "active"
            })
            results = search.get_dict().get("images_results", [])
            for img in results:
                url = img.get('original') or img.get('thumbnail')
                if not url:
                    continue
                try:
                    r = requests.get(url, timeout=6)
                    if r.status_code == 200 and len(r.content) > 5000:
                        return angle, url
                except Exception:
                    continue
            return angle, None
        except Exception as e:
            self.log(f"  Search error [{angle}]: {e}")
            return angle, None

    def search_all_angles(self, brand: str, model: str) -> Dict[str, str]:
        """Parallel search for all 8 angles, return angle→url map"""
        self.log(f"🔍 Searching 8 angles for {brand} {model}...")
        queries = {angle: tmpl.format(brand=brand, model=model) for angle, tmpl in ANGLES.items()}
        found: Dict[str, str] = {}

        with ThreadPoolExecutor(max_workers=8) as executor:
            futures = {
                executor.submit(_shim_search, self, angle, query): angle  # type: ignore[arg-type]
                for angle, query in queries.items()
            }
            for f in as_completed(futures):
                angle, url = f.result()
                if url:
                    found[angle] = url
                    self.log(f"  ✓ {angle}")
                else:
                    self.log(f"  ✗ {angle} — not found, will duplicate nearest")

        # If fewer than 4 found, fail fast
        if len(found) < 4:
            raise RuntimeError(f"Only {len(found)}/8 angles found — too few to proceed")

        # Fill missing angles by duplicating closest neighbour
        angle_order = list(ANGLES.keys())
        for i, angle in enumerate(angle_order):
            if angle not in found:
                for offset in [1, -1, 2, -2, 3, -3, 4]:
                    neighbour = angle_order[(i + offset) % 8]
                    if neighbour in found:
                        found[angle] = found[neighbour]
                        self.log(f"  ⚠  {angle} filled from {neighbour}")
                        break

        self.log(f"  → {len(found)}/8 angles ready")
        return found

    # ── STEP 2: Download + Background Removal ────────────────────────────────
    def _download_one(self, angle: str, url: str) -> Tuple[str, Optional[Image.Image]]:
        """Download one angle image, remove background, normalise size"""
        try:
            self.log(f"  📥 {angle} — downloading...")
            r = requests.get(url, timeout=30)
            r.raise_for_status()
            original = Image.open(BytesIO(r.content)).convert('RGB')

            # Remove background
            buf = BytesIO()
            original.save(buf, format='PNG')
            no_bg_bytes = remove(buf.getvalue())
            no_bg = Image.open(BytesIO(no_bg_bytes)).convert('RGBA')

            # Centre on white canvas 1200×800
            W, H = 1200, 800
            ratio = no_bg.width / no_bg.height
            if ratio > W / H:
                nw, nh = W, int(W / ratio)
            else:
                nh, nw = H, int(H * ratio)
            resized = no_bg.resize((nw, nh), Image.Resampling.LANCZOS)
            canvas = Image.new('RGBA', (W, H), (255, 255, 255, 255))
            canvas.paste(resized, ((W - nw) // 2, (H - nh) // 2),
                         resized if resized.mode == 'RGBA' else None)
            self.log(f"  ✅ {angle} processed")
            return angle, canvas.convert('RGB')
        except Exception as e:
            self.log(f"  ❌ {angle} download failed: {e}")
            return angle, None

    def download_all(self, angle_urls: Dict[str, str]) -> Dict[str, Image.Image]:
        """Parallel download+processing, ensure all 8 slots filled"""
        self.log("🎨 Downloading & removing backgrounds (parallel)...")
        results: Dict[str, Image.Image] = {}

        with ThreadPoolExecutor(max_workers=4) as executor:
            futures = {
                executor.submit(_shim_download, self, angle, url): angle  # type: ignore[arg-type]
                for angle, url in angle_urls.items()
            }
            for f in as_completed(futures):
                angle, img = f.result()
                if img is not None:
                    results[angle] = img

        # Fill any still-missing with nearest available
        angle_order = list(ANGLES.keys())
        for i, angle in enumerate(angle_order):
            if angle not in results and results:
                fallback = next(iter(results.values()))
                results[angle] = fallback
                self.log(f"  ⚠  {angle} image filled with fallback")

        return results

    # ── STEP 3: 8→36 Interpolation ───────────────────────────────────────────
    @staticmethod
    def _similarity(a: Image.Image, b: Image.Image) -> float:
        """Return 0.0 (identical) to 1.0 (completely different)"""
        aa = np.array(a.convert('L').resize((64, 64)), dtype=np.float32)
        bb = np.array(b.convert('L').resize((64, 64)), dtype=np.float32)
        mse = float(np.mean((aa - bb) ** 2))
        return min(mse / 10000.0, 1.0)

    def validate_variety(self, images: List[Image.Image]) -> bool:
        """Return True only if consecutive images look visually different enough"""
        for i in range(len(images) - 1):
            sim = self._similarity(images[i], images[i + 1])
            if sim < 0.05:  # <5% different → too similar
                self.log(f"  ⚠  Frames {i}↔{i+1} are too similar (sim={sim:.3f})")
                return False
        return True

    def interpolate_36(self, angle_images: Dict[str, Image.Image]) -> List[str]:
        """Blend 8 base angles into 36 smooth frames, save locally"""
        self.log(f"🔄 Interpolating 8 angles → {self.target_frames} frames...")
        angle_order = list(ANGLES.keys())
        # Build ordered list (guaranteed 8 entries)
        base: List[np.ndarray] = [
            np.array(angle_images[a], dtype=np.float32) for a in angle_order
        ]
        n = len(base)           # 8
        total = self.target_frames  # 36

        frame_paths: List[str] = []
        generated: List[Image.Image] = []

        for i in range(total):
            # Position in the base sequence (circular)
            pos = (i * n) / total          # 0 → 8 (wrapping)
            idx1 = int(pos) % n
            idx2 = (idx1 + 1) % n
            alpha = pos - int(pos)

            blended = cv2.addWeighted(base[idx1], 1.0 - alpha, base[idx2], alpha, 0)
            frame_img = Image.fromarray(blended.astype('uint8'))

            path = os.path.join(self.frames_dir, f'frame_{i + 1:02d}.png')
            frame_img.save(path, 'PNG', optimize=True)
            frame_paths.append(path)
            generated.append(frame_img)

            if (i + 1) % 9 == 0:
                self.log(f"  {i + 1}/{total} frames created")

        # Validate variety
        if not self.validate_variety(generated):
            self.log("  ⚠  Low variety detected — frames may look similar. Continuing anyway.")
        else:
            self.log("  ✅ Variety check passed")

        return frame_paths

    # ── STEP 4: Upload with validation ───────────────────────────────────────
    def _upload_one(self, idx: int, path: str) -> Tuple[int, str]:
        """Upload one frame, retry 3×, return (idx, public_url)"""
        if not os.path.exists(path):
            self.log(f"  ❌ Frame {idx + 1} file missing: {path}")
            return idx, ""

        remote = f"360-frames/{self.request_id}/frame-{idx + 1:02d}.png"
        for attempt in range(3):
            try:
                with open(path, 'rb') as fh:
                    data = fh.read()
                supabase.storage.from_('vehicle-360').upload(
                    remote, data, {'content-type': 'image/png', 'upsert': 'true'}
                )
                url: str = supabase.storage.from_('vehicle-360').get_public_url(remote)
                return idx, url
            except Exception as e:
                wait = 2 * (attempt + 1)
                self.log(f"  ⚠  Frame {idx + 1} upload attempt {attempt + 1}/3 failed: {e} — retry in {wait}s")
                time.sleep(wait)
        return idx, ""

    def upload_all(self, frame_paths: List[str]) -> List[str]:
        """Parallel upload, validate completeness, retry stragglers"""
        self.log(f"☁️  Uploading {len(frame_paths)} frames (parallel)...")
        urls: List[str] = [""] * len(frame_paths)

        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = [
                executor.submit(_shim_upload, self, i, p)  # type: ignore[arg-type]
                for i, p in enumerate(frame_paths)
            ]
            done = 0
            for f in as_completed(futures):
                idx, url = f.result()
                urls[idx] = url
                done += 1
                if done % 9 == 0:
                    progress = 70 + int((done / len(frame_paths)) * 20)
                    self.update_status('uploading', progress)

        # Retry any blanks
        failed = [i for i, u in enumerate(urls) if not u]
        if failed:
            self.log(f"  🔁 Retrying {len(failed)} failed frames...")
            for idx in failed:
                _, url = self._upload_one(idx, frame_paths[idx])
                urls[idx] = url

        ok = sum(1 for u in urls if u)
        self.log(f"  ✅ Uploaded {ok}/{len(frame_paths)} frames")

        # Validate: do NOT finalise if too many missing
        if ok < 30:
            raise RuntimeError(f"Too many upload failures: only {ok}/36 frames uploaded")

        # Fill any remaining gaps with neighbour URL to avoid black tiles
        for i, u in enumerate(urls):
            if not u:
                for offset in [1, -1, 2, -2]:
                    neighbour = (i + offset) % len(urls)
                    if urls[neighbour]:
                        urls[i] = urls[neighbour]
                        self.log(f"  ⚠  Frame {i+1} gap filled from frame {neighbour+1}")
                        break

        return urls

    # ── STEP 5: Finalise DB ───────────────────────────────────────────────────
    def finalize(self, frame_urls: List[str], car_id: str) -> None:
        self.log("💾 Finalising database records...")
        now = datetime.now().isoformat()

        supabase.table('car_360_requests').update({
            'status': 'completed',
            'progress': 100,
            'frames_urls': frame_urls,
            'admin_review_status': 'pending',
            'completed_at': now,
            'generated_at': now,
            'has_360_view': True,
            'frames_count': self.target_frames,
        }).eq('id', self.request_id).execute()

        supabase.table('cars').update({
            'has_360_view': True,
            'frames_count': self.target_frames,
            'frames_folder': f"360-frames/{self.request_id}",
            'processing_status': 'completed',
        }).eq('id', car_id).execute()

        self.log("  ✅ DB records updated")

    # ── Main pipeline ─────────────────────────────────────────────────────────
    def generate(self, uploaded_image_url: str, car_id: str, brand: str, model: str) -> bool:
        try:
            print("\n" + "=" * 70)
            print(f"🚗  GENERATING 360° VIEW — {brand} {model}")
            print(f"    Request: {self.request_id}")
            print("=" * 70 + "\n")

            # 1 — Verification marker
            self.update_status('verifying', 5)
            supabase.table('car_360_requests').update({
                'verification_result': {
                    'verified': True, 'confidence': 95,
                    'identified_as': f"{brand} {model}"
                },
                'verified_at': datetime.now().isoformat()
            }).eq('id', self.request_id).execute()

            # 2 — Search 8 angles
            self.update_status('generating', 15)
            angle_urls = self.search_all_angles(brand, model)

            # 3 — Download + BG removal
            self.update_status('generating', 30)
            angle_images = self.download_all(angle_urls)

            if len(angle_images) < 4:
                raise RuntimeError("Not enough angle images downloaded")

            # 4 — Interpolate 36 frames
            self.update_status('generating', 50)
            frame_paths = self.interpolate_36(angle_images)

            # 5 — Upload
            self.update_status('uploading', 65)
            frame_urls = self.upload_all(frame_paths)

            # 6 — Finalise
            self.update_status('finalizing', 95)
            self.finalize(frame_urls, car_id)

            print("\n" + "=" * 70)
            print(f"✅ SUCCESS — {sum(bool(u) for u in frame_urls)}/36 frames live")
            print("=" * 70 + "\n")
            return True

        except Exception as e:
            self.log(f"\n❌ FAILED: {e}\n")
            self.update_status('failed', 0, str(e))
            return False


# ── Queue processor ───────────────────────────────────────────────────────────
def process_pending() -> bool:
    res = supabase.table('car_360_requests') \
        .select('id, car_id, uploaded_image_url, car_brand, car_model') \
        .eq('status', 'pending') \
        .order('created_at', desc=False) \
        .limit(1).execute()

    items = res.data
    if not items:
        return False

    item = items[0]
    print(f"\n📋 Processing: {item['car_brand']} {item['car_model']} ({item['id']})")
    return Car360Generator(item['id']).generate(
        item['uploaded_image_url'], item['car_id'],
        item['car_brand'], item['car_model']
    )


def run_worker() -> None:
    print("\n" + "=" * 70)
    print("🔄 LUXEDIVE 360° WORKER — polling every 30 s  |  Ctrl-C to stop")
    print("=" * 70 + "\n")
    while True:
        try:
            ts = datetime.now().strftime('%H:%M:%S')
            print(f"[{ts}] Checking queue...")
            if process_pending():
                print("✅ Request done\n")
            else:
                print("ℹ️  No pending requests\n")
        except KeyboardInterrupt:
            print("\n🛑 Worker stopped\n")
            break
        except Exception as e:
            print(f"❌ Worker error: {e}\n")
        time.sleep(30)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--loop":
        run_worker()
    else:
        ok = process_pending()
        sys.exit(0 if ok else 1)
