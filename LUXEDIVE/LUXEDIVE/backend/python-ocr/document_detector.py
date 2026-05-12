import cv2
import numpy as np
from PIL import Image
import pytesseract
import re

class DocumentDetector:
    def __init__(self):
        self.min_area = 50000  # Minimum document area
        self.aspect_ratio_range = (1.2, 2.0)  # ID card aspect ratio
        
    def detect_document_corners(self, image):
        """Detect if document has all 4 corners visible"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blurred, 50, 150)
        
        # Find contours
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if not contours:
            return {
                'valid': False,
                'error': 'No document detected in image'
            }
        
        # Find largest contour
        largest_contour = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(largest_contour)
        
        if area < self.min_area:
            return {
                'valid': False,
                'error': 'Document too small or not fully visible'
            }
        
        # Check if contour has 4 corners (approximate to rectangle)
        epsilon = 0.02 * cv2.arcLength(largest_contour, True)
        approx = cv2.approxPolyDP(largest_contour, epsilon, True)
        
        if len(approx) != 4:
            return {
                'valid': False,
                'error': 'All 4 corners of document must be visible. Please capture full document'
            }
        
        # Check aspect ratio
        x, y, w, h = cv2.boundingRect(approx)
        aspect_ratio = w / h if w > h else h / w
        
        if not (self.aspect_ratio_range[0] <= aspect_ratio <= self.aspect_ratio_range[1]):
            return {
                'valid': False,
                'error': 'Document appears cropped or not properly aligned'
            }
        
        return {
            'valid': True,
            'corners': approx.tolist(),
            'area': area,
            'aspect_ratio': aspect_ratio
        }
    
    def classify_document_type(self, image, expected_type):
        """Detect what type of document this actually is"""
        # Extract text using OCR
        text = pytesseract.image_to_string(image)
        text_lower = text.lower()
        
        # Aadhaar detection patterns
        aadhaar_patterns = [
            'government of india',
            'aadhaar',
            'आधार',
            'unique identification',
            'uidai'
        ]
        
        # Driving License detection patterns
        dl_patterns = [
            'driving licence',
            'driving license',
            'ड्राइविंग लाइसेंस',
            'transport',
            'motor vehicles',
            'form of licence'
        ]
        
        # PAN Card patterns (forbidden)
        pan_patterns = [
            'permanent account number',
            'income tax',
            'pan',
            'पैन'
        ]
        
        # Passport patterns (forbidden)
        passport_patterns = [
            'passport',
            'पासपोर्ट',
            'republic of india',
            'type/type'
        ]
        
        detected_type = None
        
        # Check for forbidden documents first
        if any(pattern in text_lower for pattern in pan_patterns):
            return {
                'valid': False,
                'detected_type': 'PAN_CARD',
                'expected_type': expected_type,
                'error': 'PAN Card detected. Only Aadhaar and Driving License are allowed'
            }
        
        if any(pattern in text_lower for pattern in passport_patterns):
            return {
                'valid': False,
                'detected_type': 'PASSPORT',
                'expected_type': expected_type,
                'error': 'Passport detected. Only Aadhaar and Driving License are allowed'
            }
        
        # Check for allowed documents
        if any(pattern in text_lower for pattern in aadhaar_patterns):
            detected_type = 'AADHAAR'
        elif any(pattern in text_lower for pattern in dl_patterns):
            detected_type = 'DRIVING_LICENSE'
        else:
            return {
                'valid': False,
                'detected_type': 'UNKNOWN',
                'expected_type': expected_type,
                'error': 'Could not identify document type. Please upload a clear image'
            }
        
        # Verify it matches expected type
        expected_mapping = {
            'aadhaar_front': 'AADHAAR',
            'aadhaar_back': 'AADHAAR',
            'dl_front': 'DRIVING_LICENSE',
            'dl_back': 'DRIVING_LICENSE'
        }
        
        expected_doc_type = expected_mapping.get(expected_type)
        
        if detected_type != expected_doc_type:
            return {
                'valid': False,
                'detected_type': detected_type,
                'expected_type': expected_doc_type,
                'error': f'Wrong document uploaded. Expected {expected_doc_type}, but found {detected_type}'
            }
        
        return {
            'valid': True,
            'detected_type': detected_type,
            'confidence': 0.95
        }
    
    def detect_front_vs_back(self, image, declared_side):
        """Determine if image is front or back side"""
        text = pytesseract.image_to_string(image).lower()
        
        # Aadhaar front indicators
        aadhaar_front_patterns = ['date of birth', 'dob', 'जन्म तिथि', 'male', 'female']
        # Aadhaar back indicators  
        aadhaar_back_patterns = ['address', 'पता', 'pin code', 'pincode']
        
        # DL front indicators
        dl_front_patterns = ['date of issue', 'doi', 'date of birth', 'photo']
        # DL back indicators
        dl_back_patterns = ['blood group', 'bg', 'emergency contact', 'donor']
        
        is_front = any(pattern in text for pattern in aadhaar_front_patterns + dl_front_patterns)
        is_back = any(pattern in text for pattern in aadhaar_back_patterns + dl_back_patterns)
        
        if declared_side == 'front' and not is_front:
            return {
                'valid': False,
                'error': 'This appears to be the back side, but you selected front'
            }
        
        if declared_side == 'back' and not is_back:
            return {
                'valid': False,
                'error': 'This appears to be the front side, but you selected back'
            }
        
        return {'valid': True}
