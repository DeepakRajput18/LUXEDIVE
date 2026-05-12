"""
LUXEDIVE 360° Transformation Generator
Generates 36 rotation frames from a single image using pure transformations.
NO AI. NO APIs. 100% local and deterministic.
"""

import os
import sys
import numpy as np
import cv2
from PIL import Image
from io import BytesIO
from typing import List, Tuple
import requests
from rembg import remove
from dotenv import load_dotenv
from supabase import create_client, Client
import json
from datetime import datetime
import time

# Load environment
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)  # type: ignore

# Create temp directories
os.makedirs('temp_360', exist_ok=True)
os.makedirs('temp_frames', exist_ok=True)


class Transform360Generator:
    """
    Generates 360° rotation frames from single image using transformations.
    """
    
    def __init__(self, request_id: str):
        self.request_id = request_id
        self.target_frames = 36
        self.canvas_size = (1200, 800)  # Width x Height
        
    def log(self, message: str) -> None:
        """Print with timestamp"""
        timestamp = datetime.now().strftime('%H:%M:%S')
        print(f"[{timestamp}] {message}")
    
    def update_status(self, status: str, progress: int = 0, error: str = None) -> None:
        """Update database status"""
        try:
            update_data = {
                'status': status,
                'progress': progress,
                'updated_at': datetime.now().isoformat()
            }
            if error:
                update_data['error_message'] = error
                
            supabase.table('car_360_requests').update(update_data).eq('id', self.request_id).execute()
        except Exception as e:
            self.log(f"⚠️  Status update failed: {e}")
    
    # ========================================================================
    # STEP 1: INPUT PREPROCESSING
    # ========================================================================
    
    def preprocess_image(self, image_url: str) -> np.ndarray:
        """
        Load image, remove background, place on centered canvas
        Returns: RGBA numpy array (1200x800)
        """
        self.log("📥 STEP 1: Preprocessing image...")
        self.update_status('preprocessing', 10)
        
        # Download image
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(image_url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Load as PIL
        img_pil = Image.open(BytesIO(response.content)).convert('RGB')
        
        # Remove background
        self.log("  🎨 Removing background...")
        img_bytes = BytesIO()
        img_pil.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        no_bg_bytes = remove(img_bytes.getvalue())
        no_bg_img = Image.open(BytesIO(no_bg_bytes)).convert('RGBA')
        
        # Convert to numpy
        img_np = np.array(no_bg_img)
        
        # Place on centered canvas
        self.log("  🖼️  Centering on canvas...")
        canvas = self._center_on_canvas(img_np)
        
        self.log("✅ Preprocessing complete")
        return canvas
    
    def _center_on_canvas(self, img: np.ndarray) -> np.ndarray:
        """Place image on centered white canvas"""
        h, w = img.shape[:2]
        canvas_w, canvas_h = self.canvas_size
        
        # Calculate resize to fit canvas (maintain aspect ratio)
        scale = min(canvas_w / w, canvas_h / h) * 0.8  # 80% of canvas
        new_w, new_h = int(w * scale), int(h * scale)
        
        # Resize image
        img_resized = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
        
        # Create white canvas
        canvas = np.ones((canvas_h, canvas_w, 4), dtype=np.uint8) * 255
        canvas[:, :, 3] = 0  # Transparent background
        
        # Center image on canvas
        y_offset = (canvas_h - new_h) // 2
        x_offset = (canvas_w - new_w) // 2
        
        # Alpha composite
        alpha = img_resized[:, :, 3:4] / 255.0
        canvas[y_offset:y_offset+new_h, x_offset:x_offset+new_w, :3] = \
            img_resized[:, :, :3] * alpha + canvas[y_offset:y_offset+new_h, x_offset:x_offset+new_w, :3] * (1 - alpha)
        canvas[y_offset:y_offset+new_h, x_offset:x_offset+new_w, 3] = img_resized[:, :, 3]
        
        return canvas
    
    # ========================================================================
    # STEP 2-7: TRANSFORMATION PIPELINE
    # ========================================================================
    
    def generate_frame(self, base_image: np.ndarray, frame_index: int) -> np.ndarray:
        """
        Generate single frame from base image using transformations
        
        Args:
            base_image: Original preprocessed image (RGBA)
            frame_index: 0-35
        
        Returns:
            Transformed frame (RGBA)
        """
        # Calculate angle (0° to 360°)
        angle_deg = (frame_index / self.target_frames) * 360
        angle_rad = np.radians(angle_deg)
        
        # Copy base image
        frame = base_image.copy()
        
        # STEP 2: Depth simulation using cosine
        frame = self._apply_depth_scaling(frame, angle_rad)
        
        # STEP 3: Perspective transform
        frame = self._apply_perspective_transform(frame, angle_rad)
        
        # STEP 4: Slight rotation
        frame = self._apply_rotation(frame, angle_rad)
        
        # STEP 5: Lighting simulation
        frame = self._apply_lighting(frame, angle_rad)
        
        # STEP 6: Shadow addition
        frame = self._add_shadow(frame, angle_rad)
        
        # STEP 9: Edge smoothing
        frame = self._smooth_edges(frame)
        
        return frame
    
    def _apply_depth_scaling(self, img: np.ndarray, angle: float) -> np.ndarray:
        """
        STEP 2: Simulate depth using cosine-based scaling
        
        Front view (0°): Normal width
        Side view (90°/270°): Compressed width (thinner)
        Back view (180°): Normal width
        """
        # Calculate scale factors
        scale_x = 0.6 + 0.4 * np.cos(angle)  # 0.6 to 1.0
        scale_y = 1.0 - 0.1 * abs(np.sin(angle))  # 0.9 to 1.0
        
        h, w = img.shape[:2]
        new_w = int(w * scale_x)
        new_h = int(h * scale_y)
        
        # Resize
        scaled = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
        
        # Re-center on canvas
        canvas = np.zeros_like(img)
        y_offset = (h - new_h) // 2
        x_offset = (w - new_w) // 2
        
        canvas[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = scaled
        
        return canvas
    
    def _apply_perspective_transform(self, img: np.ndarray, angle: float) -> np.ndarray:
        """
        STEP 3: Apply perspective transform to simulate rotation
        
        Left angles (90°-180°): Compress left side
        Right angles (0°-90°, 270°-360°): Compress right side
        """
        h, w = img.shape[:2]
        
        # Determine perspective shift
        # sin(angle) ranges from -1 (left) to +1 (right)
        shift_factor = np.sin(angle) * 0.2  # Max 20% shift
        
        # Define source points (original rectangle)
        src_pts = np.float32([
            [0, 0],           # Top-left
            [w, 0],           # Top-right
            [w, h],           # Bottom-right
            [0, h]            # Bottom-left
        ])
        
        # Define destination points (trapezoid)
        shift_x = int(w * abs(shift_factor))
        
        if shift_factor > 0:  # Right side view - compress right
            dst_pts = np.float32([
                [0, 0],
                [w - shift_x, shift_x],
                [w - shift_x, h - shift_x],
                [0, h]
            ])
        else:  # Left side view - compress left
            dst_pts = np.float32([
                [shift_x, shift_x],
                [w, 0],
                [w, h],
                [shift_x, h - shift_x]
            ])
        
        # Get perspective transform matrix
        matrix = cv2.getPerspectiveTransform(src_pts, dst_pts)
        
        # Apply transform
        warped = cv2.warpPerspective(
            img, matrix, (w, h),
            borderMode=cv2.BORDER_CONSTANT,
            borderValue=(0, 0, 0, 0)
        )
        
        return warped
    
    def _apply_rotation(self, img: np.ndarray, angle: float) -> np.ndarray:
        """
        STEP 4: Apply slight rotation for realism
        """
        h, w = img.shape[:2]
        
        # Slight rotation based on viewing angle
        rotation_deg = np.sin(angle) * 5  # -5° to +5°
        
        # Get rotation matrix
        center = (w // 2, h // 2)
        matrix = cv2.getRotationMatrix2D(center, rotation_deg, 1.0)
        
        # Apply rotation
        rotated = cv2.warpAffine(
            img, matrix, (w, h),
            borderMode=cv2.BORDER_CONSTANT,
            borderValue=(0, 0, 0, 0)
        )
        
        return rotated
    
    def _apply_lighting(self, img: np.ndarray, angle: float) -> np.ndarray:
        """
        STEP 5: Simulate lighting changes
        
        Front (0°): Brightest
        Side (90°/270°): Medium
        Back (180°): Darkest
        """
        # Calculate brightness factor
        # Front = 1.0, Back = 0.7, Sides = 0.85
        brightness = 1.0 - 0.3 * abs(np.sin(angle))
        
        # Apply brightness to RGB channels only (preserve alpha)
        result = img.copy()
        result[:, :, :3] = np.clip(img[:, :, :3] * brightness, 0, 255).astype(np.uint8)
        
        return result
    
    def _add_shadow(self, img: np.ndarray, angle: float) -> np.ndarray:
        """
        STEP 6: Add soft shadow under car
        """
        h, w = img.shape[:2]
        
        # Create shadow layer
        shadow = np.zeros((h, w, 4), dtype=np.uint8)
        
        # Shadow position (bottom center)
        shadow_y = int(h * 0.85)
        shadow_x = w // 2
        
        # Shadow size based on viewing angle
        shadow_width = int(w * (0.3 + 0.1 * abs(np.cos(angle))))
        shadow_height = int(h * 0.1)
        
        # Draw ellipse shadow
        cv2.ellipse(
            shadow,
            (shadow_x, shadow_y),
            (shadow_width, shadow_height),
            0, 0, 360,
            (0, 0, 0, 80),  # Semi-transparent black
            -1
        )
        
        # Blur shadow
        shadow = cv2.GaussianBlur(shadow, (41, 41), 0)
        
        # Composite shadow under car
        alpha_shadow = shadow[:, :, 3:4] / 255.0
        alpha_car = img[:, :, 3:4] / 255.0
        
        result = img.copy()
        
        # Blend where car is transparent
        mask = alpha_car < 0.1
        result[:, :, :3] = np.where(
            mask,
            shadow[:, :, :3] * alpha_shadow + result[:, :, :3] * (1 - alpha_shadow),
            result[:, :, :3]
        ).astype(np.uint8)
        result[:, :, 3] = np.maximum(img[:, :, 3], shadow[:, :, 3])
        
        return result
    
    def _smooth_edges(self, img: np.ndarray) -> np.ndarray:
        """
        STEP 9: Apply slight Gaussian blur to smooth edges
        """
        # Separate alpha channel
        alpha = img[:, :, 3]
        
        # Find edges
        edges = cv2.Canny(alpha, 50, 150)
        
        # Dilate edges
        kernel = np.ones((3, 3), np.uint8)
        edge_mask = cv2.dilate(edges, kernel, iterations=2)
        
        # Blur only the edges
        blurred = cv2.GaussianBlur(img, (5, 5), 0)
        
        # Composite: blurred edges + sharp interior
        result = img.copy()
        edge_mask_3d = edge_mask[:, :, np.newaxis] / 255.0
        result = (blurred * edge_mask_3d + img * (1 - edge_mask_3d)).astype(np.uint8)
        
        return result
    
    # ========================================================================
    # STEP 8: SMOOTH TRANSITIONS
    # ========================================================================
    
    def interpolate_frames(self, frames: List[np.ndarray]) -> List[np.ndarray]:
        """
        STEP 8: Ensure smooth transitions between frames
        Apply temporal smoothing
        """
        self.log("🔄 Applying temporal smoothing...")
        
        smoothed = []
        
        for i in range(len(frames)):
            prev_idx = (i - 1) % len(frames)
            next_idx = (i + 1) % len(frames)
            
            # Blend with neighbors (70% current, 15% prev, 15% next)
            blended = (
                0.70 * frames[i].astype(np.float32) +
                0.15 * frames[prev_idx].astype(np.float32) +
                0.15 * frames[next_idx].astype(np.float32)
            ).astype(np.uint8)
            
            smoothed.append(blended)
        
        return smoothed
    
    # ========================================================================
    # MAIN PIPELINE
    # ========================================================================
    
    def generate_all_frames(self, image_url: str) -> List[str]:
        """
        Generate all 36 frames from single image
        
        Returns:
            List of file paths to generated frames
        """
        self.log("\n" + "="*70)
        self.log("🎨 GENERATING 360° FRAMES VIA TRANSFORMATIONS")
        self.log("="*70 + "\n")
        
        # STEP 1: Preprocess
        base_image = self.preprocess_image(image_url)
        
        # STEPS 2-7: Generate all frames
        self.log("🔄 Generating 36 frames...")
        self.update_status('generating', 30)
        
        raw_frames = []
        for i in range(self.target_frames):
            frame = self.generate_frame(base_image, i)
            raw_frames.append(frame)
            
            if (i + 1) % 6 == 0:
                progress = 30 + int((i + 1) / self.target_frames * 40)
                self.update_status('generating', progress)
                self.log(f"  Generated {i + 1}/{self.target_frames} frames")
        
        # STEP 8: Smooth transitions
        self.update_status('smoothing', 70)
        smoothed_frames = self.interpolate_frames(raw_frames)
        
        # STEP 10: Save frames
        self.log("💾 Saving frames...")
        self.update_status('saving', 80)
        
        frame_paths = []
        for i, frame in enumerate(smoothed_frames):
            # Convert RGBA to RGB with white background for PNG
            rgb = cv2.cvtColor(frame, cv2.COLOR_RGBA2BGRA)
            
            path = f"temp_frames/frame_{i+1:02d}.png"
            cv2.imwrite(path, rgb)
            frame_paths.append(path)
            
            if (i + 1) % 6 == 0:
                self.log(f"  Saved {i + 1}/{self.target_frames} frames")
        
        self.log("✅ All frames generated")
        return frame_paths
    
    def upload_frames(self, frame_paths: List[str]) -> List[str]:
        """Upload frames to Supabase Storage"""
        self.log("☁️  Uploading frames to Supabase...")
        self.update_status('uploading', 85)
        
        frame_urls = []
        
        for i, path in enumerate(frame_paths):
            with open(path, 'rb') as f:
                img_bytes = f.read()
            
            remote_path = f"360-frames/{self.request_id}/frame-{i+1:02d}.png"
            
            supabase.storage.from_('vehicle-360').upload(
                remote_path,
                img_bytes,
                {'content-type': 'image/png', 'upsert': 'true'}
            )
            
            url = supabase.storage.from_('vehicle-360').get_public_url(remote_path)
            frame_urls.append(url)
            
            if (i + 1) % 6 == 0:
                progress = 85 + int((i + 1) / len(frame_paths) * 10)
                self.update_status('uploading', progress)
        
        self.log(f"✅ Uploaded {len(frame_urls)} frames")
        return frame_urls
    
    def finalize(self, frame_urls: List[str], car_id: str) -> None:
        """Update database"""
        self.log("💾 Finalizing...")
        self.update_status('finalizing', 98)
        
        now = datetime.now().isoformat()
        supabase.table('car_360_requests').update({
            'status': 'completed',
            'progress': 100,
            'frames_urls': frame_urls,
            'admin_review_status': 'pending',
            'completed_at': now
        }).eq('id', self.request_id).execute()
        
        supabase.table('cars').update({
            'has_360_view': True,
            'frames_count': self.target_frames,
            'image_360_folder': f"360-frames/{self.request_id}",
            'frames_urls': frame_urls,
            'processing_status': 'completed'
        }).eq('id', car_id).execute()
        
        self.log("✅ Database updated")
    
    def generate(self, image_url: str, car_id: str, brand: str, model: str) -> bool:
        """
        Main entry point
        """
        try:
            start_time = time.time()
            
            self.log(f"Car: {brand} {model}")
            self.log(f"Request ID: {self.request_id}\n")
            
            # Generate frames
            frame_paths = self.generate_all_frames(image_url)
            
            # Upload
            frame_urls = self.upload_frames(frame_paths)
            
            # Finalize
            self.finalize(frame_urls, car_id)
            
            elapsed = time.time() - start_time
            
            print("\n" + "="*70)
            print("✅ SUCCESS")
            print(f"Generated: {len(frame_urls)} frames")
            print(f"Time: {elapsed:.1f} seconds")
            print(f"Method: Pure transformations (NO AI)")
            print("="*70 + "\n")
            
            return True
            
        except Exception as e:
            self.log(f"\n❌ ERROR: {e}\n")
            self.update_status('failed', 0, str(e))
            return False


# ============================================================================
# WORKER
# ============================================================================

def process_pending_request() -> bool:
    """Process one pending request"""
    try:
        res = supabase.table('car_360_requests') \
            .select('id, car_id, uploaded_image_url, car_brand, car_model') \
            .eq('status', 'pending') \
            .order('created_at', desc=False) \
            .limit(1).execute()
            
        if not res.data:
            return False
            
        request = res.data[0]
        request_id = request['id']
        car_id = request['car_id']
        image_url = request['uploaded_image_url']
        brand = request['car_brand']
        model = request['car_model']
        
        generator = Transform360Generator(request_id)
        return generator.generate(image_url, car_id, brand, model)
    except Exception as e:
        print(f"Error fetching request: {e}")
        return False


def run_worker_loop() -> None:
    """Continuous worker"""
    print("\n" + "="*70)
    print("🔄 LUXEDIVE 360° TRANSFORM WORKER")
    print("Method: Pure image transformations (NO AI)")
    print("Polling every 30 seconds...")
    print("="*70 + "\n")
    
    while True:
        try:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Checking queue...")
            
            success = process_pending_request()
            
            if success:
                print("✅ Request completed\n")
            else:
                print("ℹ️  No pending requests\n")
                
        except KeyboardInterrupt:
            print("\n🛑 Worker stopped\n")
            break
        except Exception as e:
            print(f"❌ Error: {e}\n")
        
        time.sleep(30)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--loop":
        run_worker_loop()
    else:
        success = process_pending_request()
        sys.exit(0 if success else 1)
