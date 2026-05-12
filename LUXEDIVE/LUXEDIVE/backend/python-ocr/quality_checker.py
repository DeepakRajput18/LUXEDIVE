import cv2
import numpy as np
from scipy import ndimage

class QualityChecker:
    def check_image_quality(self, image):
        """Comprehensive image quality checks"""
        errors = []
        
        # 1. Resolution check (Skipped as per user request)
        height, width = image.shape[:2]
        # if width < 1000 or height < 800:
        #     errors.append(f'Image resolution too low ({width}x{height}). Minimum required: 1000x800 pixels')

        
        # 2. Blur detection (Laplacian variance)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        
        if laplacian_var < 100:
            errors.append(f'Image is blurry (score: {laplacian_var:.1f}). Please upload a clear, focused image')
        
        # 3. Brightness check
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        brightness = np.mean(hsv[:, :, 2])
        
        if brightness < 50:
            errors.append(f'Image is too dark (brightness: {brightness:.1f}). Please ensure proper lighting')
        elif brightness > 220:
            errors.append(f'Image is overexposed (brightness: {brightness:.1f}). Please reduce lighting')
        
        # 4. Check for proper exposure (histogram analysis)
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        hist_ratio = np.sum(hist[:50]) / np.sum(hist)  # Ratio of dark pixels
        
        if hist_ratio > 0.5:
            errors.append('Image has poor exposure. Most of the image is too dark')
        
        # 5. Noise detection
        noise = self._estimate_noise(gray)
        if noise > 15:
            errors.append(f'Image has too much noise (score: {noise:.1f}). Please capture in better lighting')
        
        # 6. Check if image is a screenshot
        if self._is_screenshot(image):
            errors.append('Screenshots are not allowed. Please upload original photo of the document')
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'metrics': {
                'resolution': f'{width}x{height}',
                'blur_score': float(laplacian_var),
                'brightness': float(brightness),
                'noise_level': float(noise)
            }
        }
    
    def _estimate_noise(self, image):
        """Estimate noise level in image"""
        H, W = image.shape
        M = [[1, -2, 1],
             [-2, 4, -2],
             [1, -2, 1]]
        sigma = np.sum(np.sum(np.absolute(ndimage.convolve(image, M))))
        sigma = sigma * np.sqrt(0.5 * np.pi) / (6 * (W - 2) * (H - 2))
        return sigma
    
    def _is_screenshot(self, image):
        """Detect if image is a screenshot"""
        # Screenshots often have very uniform edges and specific aspect ratios
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150)
        
        # Check top and bottom rows for straight lines (common in screenshots)
        top_edge_density = np.sum(edges[0:10, :]) / (edges.shape[1] * 10)
        bottom_edge_density = np.sum(edges[-10:, :]) / (edges.shape[1] * 10)
        
        # Screenshots usually have sharp, uniform edges
        if top_edge_density > 0.8 and bottom_edge_density > 0.8:
            return True
        
        return False
