from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from PIL import Image
import io
import imagehash
import os

from document_detector import DocumentDetector
from ocr_engine import OCREngine
from quality_checker import QualityChecker
from face_detector import FaceDetector

app = FastAPI(title="LUXEDIVE Document Verification API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
doc_detector = DocumentDetector()
ocr_engine = OCREngine()
quality_checker = QualityChecker()
face_detector = FaceDetector()

@app.post("/validate-document")
async def validate_document(
    file: UploadFile = File(...),
    document_type: str = Form(...),
    side: str = Form(None)
):
    """
    Validate uploaded document with comprehensive checks
    
    document_type: aadhaar_front, aadhaar_back, dl_front, dl_back, passport_photo
    side: front or back (for documents with sides)
    """
    try:
        # Read image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return {
                'valid': False,
                'errors': ['Invalid image file. Please upload a valid JPG or PNG image']
            }
        
        all_errors = []
        validations = {}
        
        # VALIDATION 1: Image Quality Check
        # quality_result = quality_checker.check_image_quality(image)
        # validations['quality'] = quality_result
        # if not quality_result['valid']:
        #     all_errors.extend(quality_result['errors'])


        
        # VALIDATION 2: Passport Photo Specific Checks
        if document_type == 'passport_photo':
            face_result = face_detector.validate_passport_photo(image)
            validations['face'] = face_result
            if not face_result['valid']:
                all_errors.extend(face_result['errors'])
            
            # Skip document detection for passport photo
            if all_errors:
                return {
                    'valid': False,
                    'errors': all_errors,
                    'validations': validations
                }
            
            return {
                'valid': True,
                'document_type': 'PASSPORT_PHOTO',
                'validations': validations
            }
        
        # VALIDATION 3: Document Corner Detection
        corner_result = doc_detector.detect_document_corners(image)
        validations['corners'] = corner_result
        if not corner_result['valid']:
            all_errors.append(corner_result['error'])
        
        # VALIDATION 4: Document Type Classification
        classification_result = doc_detector.classify_document_type(image, document_type)
        validations['classification'] = classification_result
        if not classification_result['valid']:
            all_errors.append(classification_result['error'])
        
        # VALIDATION 5: Front vs Back Detection
        if side:
            side_result = doc_detector.detect_front_vs_back(image, side)
            validations['side'] = side_result
            if not side_result['valid']:
                all_errors.append(side_result['error'])
        
        # If any validation failed, return errors
        if all_errors:
            return {
                'valid': False,
                'errors': all_errors,
                'validations': validations
            }
        
        # VALIDATION 6: OCR Text Extraction
        text = ocr_engine.extract_text_tesseract(image)
        
        extracted_data = {}
        if 'AADHAAR' in classification_result['detected_type']:
            extracted_data = ocr_engine.extract_aadhaar_details(text)
        elif 'DRIVING_LICENSE' in classification_result['detected_type']:
            extracted_data = ocr_engine.extract_dl_details(text)
        
        validations['ocr'] = {
            'text_extracted': bool(text),
            'data': extracted_data
        }
        
        # VALIDATION 7: Generate image hash for duplicate detection
        pil_image = Image.open(io.BytesIO(contents))
        img_hash = str(imagehash.average_hash(pil_image))
        
        # All validations passed
        return {
            'valid': True,
            'document_type': classification_result['detected_type'],
            'image_hash': img_hash,
            'extracted_data': extracted_data,
            'validations': validations,
            'message': 'Document validated successfully'
        }
        
    except Exception as e:
        return {
            'valid': False,
            'errors': [f'Validation error: {str(e)}']
        }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Document Verification API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
