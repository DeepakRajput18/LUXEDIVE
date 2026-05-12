"""
LUXEDIVE 360° Grid Image Splitter
Analyzes a 6x6 Sprite Sheet, isolates the actual grid content ignoring margins, 
extracts each cell, strictly centers the object within the cell, and exports frames.

Features:
- Global Bounding Box Detection (ignores outer margins)
- Inner Padding Contract (ignores thick cell boundaries)
- Individual Frame Centering (perfect rotation stability)
- Debug Visualization Overlay
"""

import cv2
import numpy as np
import os
import argparse
from pathlib import Path

def get_content_bounding_box(image_bgr):
    """
    Finds the bounding box of all non-white (or non-background) content in an image.
    Assumes a generally white/light background.
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    
    # Threshold: anything darker than 240 is considered "content"
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        return 0, 0, image_bgr.shape[1], image_bgr.shape[0]
        
    # Find the maximum bounding box that encapsulates all contours
    x_min = image_bgr.shape[1]
    y_min = image_bgr.shape[0]
    x_max = 0
    y_max = 0
    
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if w > 10 and h > 10: # Ignore noise
            x_min = min(x_min, x)
            y_min = min(y_min, y)
            x_max = max(x_max, x + w)
            y_max = max(y_max, y + h)
            
    # Fallback if no valid contours
    if x_min >= x_max or y_min >= y_max:
        return 0, 0, image_bgr.shape[1], image_bgr.shape[0]
        
    return x_min, y_min, (x_max - x_min), (y_max - y_min)

def center_object_in_canvas(cell_bgr, target_w, target_h):
    """
    Tight-crops the object inside the cell and centers it perfectly 
    onto a white canvas of target_w x target_h.
    """
    x, y, w, h = get_content_bounding_box(cell_bgr)
    
    # If cell is essentially empty, just return white canvas
    if w <= 10 or h <= 10:
        return np.ones((target_h, target_w, 3), dtype=np.uint8) * 255
        
    tight_crop = cell_bgr[y:y+h, x:x+w]
    
    # Ensure crop fits inside targets
    scale = min((target_w - 20) / w, (target_h - 20) / h, 1.0)
    if scale < 1.0:
        new_w = int(w * scale)
        new_h = int(h * scale)
        tight_crop = cv2.resize(tight_crop, (new_w, new_h), interpolation=cv2.INTER_AREA)
        w, h = new_w, new_h
        
    canvas = np.ones((target_h, target_w, 3), dtype=np.uint8) * 255
    start_x = (target_w - w) // 2
    start_y = (target_h - h) // 2
    
    canvas[start_y:start_y+h, start_x:start_x+w] = tight_crop
    return canvas

def detect_grid_structure(image_bgr, gx, gy, gw, gh):
    """
    Uses Cartesian pixel projection to detect the number of rows and columns
    by finding the continuous empty spaces (gutters) between grid items.
    """
    cropped = image_bgr[gy:gy+gh, gx:gx+gw]
    gray = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)
    
    # Threshold: Content becomes 255 (white), Background becomes 0 (black)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # 1D Projection arrays
    proj_y = np.sum(thresh, axis=1) # Horizontal projection
    proj_x = np.sum(thresh, axis=0) # Vertical projection
    
    def count_valleys(projection_array, threshold_ratio=0.01, min_gutter_width=5):
        max_val = np.max(projection_array)
        threshold = max_val * threshold_ratio
        
        in_valley = False
        valley_count = 0
        current_gutter_width = 0
        
        for val in projection_array:
            if val <= threshold:
                if not in_valley:
                    in_valley = True
                    current_gutter_width = 1
                else:
                    current_gutter_width += 1
            else:
                if in_valley:
                    if current_gutter_width >= min_gutter_width:
                        valley_count += 1
                    in_valley = False
                    current_gutter_width = 0
        
        # If image ends on a valley, don't count it as internal separator
        return valley_count

    # The number of items is the number of internal separators + 1
    rows = count_valleys(proj_y) + 1
    cols = count_valleys(proj_x) + 1
    
    # Sanity bounding (fallback to 6x6 if algo completely fails)
    if rows <= 1 and cols <= 1:
        return 6, 6
        
    return rows, cols

def split_grid(input_path, output_dir, padding=10, debug=False, rows_override=None, cols_override=None):
    print(f"[SPLITTER] Loading image: {input_path}")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = cv2.imread(input_path)
    if img is None:
        print("[SPLITTER] Error: Could not load image.")
        return False
        
    # Convert transparent PNGs to opaque white background if needed
    if img.shape[2] == 4:
        alpha_channel = img[:,:,3]
        rgb_channels = img[:,:,:3]
        white_background = np.ones_like(rgb_channels) * 255
        alpha_factor = alpha_channel[:,:,np.newaxis] / 255.0
        img = (rgb_channels * alpha_factor + white_background * (1 - alpha_factor)).astype(np.uint8)
        
    debug_img = img.copy() if debug else None
        
    # --- STEP 1: Global Grid Crop ---
    gx, gy, gw, gh = get_content_bounding_box(img)
    print(f"[SPLITTER] Global Grid Bounding Box: X={gx}, Y={gy}, W={gw}, H={gh}")
    
    # --- STEP 2: Auto-Detect or Override Grid Dimensions ---
    if rows_override and cols_override:
        rows, cols = rows_override, cols_override
        print(f"[SPLITTER] Using explicit Grid layout: {rows} Rows x {cols} Columns")
    else:
        rows, cols = detect_grid_structure(img, gx, gy, gw, gh)
        print(f"[SPLITTER] Auto-Detected Grid layout: {rows} Rows x {cols} Columns (Total {rows*cols} cells)")
    
    if debug:
        cv2.rectangle(debug_img, (gx, gy), (gx+gw, gy+gh), (255, 0, 0), 4)
        
    # Slice the matrix dynamically with strict Integer Division
    cell_w = gw // cols
    cell_h = gh // rows
    
    x_offset = (gw - (cell_w * cols)) // 2
    y_offset = (gh - (cell_h * rows)) // 2
    
    valid_frames = 0
    extracted_frames = []
    
    for row in range(rows):
        for col in range(cols):
            # Calculate raw boundaries using safe integer offset
            x1 = int(gx + x_offset + (col * cell_w))
            y1 = int(gy + y_offset + (row * cell_h))
            x2 = x1 + cell_w
            y2 = y1 + cell_h
            
            # Apply inward padding
            crop_x1 = x1 + padding
            crop_y1 = y1 + padding
            crop_x2 = x2 - padding
            crop_y2 = y2 - padding
            
            if debug:
                # Green box for padded extraction zone
                cv2.rectangle(debug_img, (crop_x1, crop_y1), (crop_x2, crop_y2), (0, 255, 0), 1)
                
            cell_content = img[crop_y1:crop_y2, crop_x1:crop_x2]
            
            # Centering Phase
            target_canvas_w = int(cell_w)
            target_canvas_h = int(cell_h)
            
            centered_frame = center_object_in_canvas(cell_content, target_canvas_w, target_canvas_h)
            extracted_frames.append(centered_frame)
            
    # Sub-sample to precisely 36 frames if we have too many
    final_output_frames = []
    if len(extracted_frames) > 36:
        indices = np.linspace(0, len(extracted_frames) - 1, 36, dtype=int)
        final_output_frames = [extracted_frames[i] for i in indices]
        print(f"[SPLITTER] Downsampled {len(extracted_frames)} frames down to 36.")
    else:
        final_output_frames = extracted_frames
        
    # Write them out
    for i, frame in enumerate(final_output_frames):
        out_file = os.path.join(output_dir, f"frame-{i+1:02d}.png")
        cv2.imwrite(out_file, frame)
        valid_frames += 1

    if debug:
        # Draw full grid lines in Magenta
        for r in range(rows + 1):
            y = int(gy + y_offset + (r * cell_h))
            cv2.line(debug_img, (gx + x_offset, y), (gx + x_offset + (cols * cell_w), y), (255, 0, 255), 2)
        for c in range(cols + 1):
            x = int(gx + x_offset + (c * cell_w))
            cv2.line(debug_img, (x, gy + y_offset), (x, gy + y_offset + (rows * cell_h)), (255, 0, 255), 2)

        debug_out = os.path.join(output_dir, "debug_grid.jpg")
        cv2.imwrite(debug_out, debug_img)
        print(f"[SPLITTER] Debug image saved to: {debug_out}")
        
    print(f"[SPLITTER] Successfully extracted and centered {valid_frames} frames to {output_dir}")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Split 360 Grid into 36 uniform frames.")
    parser.add_argument("input_image", help="Path to the 6x6 grid image")
    parser.add_argument("output_dir", help="Directory to save the 36 extracted frames")
    parser.add_argument("--rows", type=int, help="Manual override for number of rows in the grid.")
    parser.add_argument("--cols", type=int, help="Manual override for number of columns in the grid.")
    
    args = parser.parse_args()
    
    split_grid(args.input_image, args.output_dir, args.padding, args.debug, args.rows, args.cols)
