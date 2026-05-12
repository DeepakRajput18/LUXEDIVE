import pytesseract
from google.cloud import vision
import re
import os

class OCREngine:
    def __init__(self):
        # Set Google Cloud credentials if available
        if os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
            self.vision_client = vision.ImageAnnotatorClient()
            self.use_google_vision = True
        else:
            self.use_google_vision = False
            print("Google Vision not configured, using Tesseract only")
    
    def extract_text_tesseract(self, image):
        """Extract text using Tesseract OCR"""
        # Try both English and Hindi
        try:
            text_eng = pytesseract.image_to_string(image, lang='eng')
            # Hindi support depends on whether hin.traineddata is present
            try:
                text_hin = pytesseract.image_to_string(image, lang='hin')
            except:
                text_hin = ""
        except Exception as e:
            print(f"Tesseract error: {e}")
            return ""
        
        return text_eng + "\n" + text_hin
    
    def extract_text_google(self, image_bytes):
        """Extract text using Google Vision API"""
        if not self.use_google_vision:
            return None
        
        try:
            image = vision.Image(content=image_bytes)
            response = self.vision_client.text_detection(image=image)
            texts = response.text_annotations
            
            if texts:
                return texts[0].description
            return ""
        except Exception as e:
            print(f"Google Vision error: {e}")
            return None
    
    def extract_aadhaar_details(self, text):
        """Extract Aadhaar number and name"""
        # Aadhaar number pattern: 1234 5678 9012
        aadhaar_pattern = r'\b\d{4}\s\d{4}\s\d{4}\b'
        aadhaar_match = re.search(aadhaar_pattern, text)
        
        aadhaar_number = aadhaar_match.group() if aadhaar_match else None
        
        # Extract name (usually appears after DOB line or in a specific format)
        name_pattern = r'(?:Name|नाम)[\s:]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)'
        name_match = re.search(name_pattern, text, re.IGNORECASE)
        
        name = name_match.group(1) if name_match else None
        
        # Extract DOB
        dob_pattern = r'(?:DOB|Date of Birth|जन्म तिथि)[\s:]+(\d{2}/\d{2}/\d{4})'
        dob_match = re.search(dob_pattern, text, re.IGNORECASE)
        
        dob = dob_match.group(1) if dob_match else None
        
        return {
            'aadhaar_number': aadhaar_number,
            'name': name,
            'dob': dob
        }
    
    def extract_dl_details(self, text):
        """Extract DL number and name"""
        # DL number patterns vary by state
        dl_pattern = r'[A-Z]{2}[-/]?\d{2,4}[-/]?\d{4,11}'
        dl_match = re.search(dl_pattern, text)
        
        dl_number = dl_match.group() if dl_match else None
        
        # Extract name
        name_pattern = r'(?:Name|नाम)[\s:]+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)'
        name_match = re.search(name_pattern, text, re.IGNORECASE)
        
        name = name_match.group(1) if name_match else None
        
        # Extract DOI (Date of Issue)
        doi_pattern = r'(?:DOI|Date of Issue)[\s:]+(\d{2}[-/]\d{2}[-/]\d{4})'
        doi_match = re.search(doi_pattern, text, re.IGNORECASE)
        
        doi = doi_match.group(1) if doi_match else None
        
        return {
            'dl_number': dl_number,
            'name': name,
            'date_of_issue': doi
        }
