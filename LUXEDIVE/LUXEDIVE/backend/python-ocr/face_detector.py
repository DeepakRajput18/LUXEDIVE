import cv2
import numpy as np

class FaceDetector:
    def __init__(self):
        # Load OpenCV's pre-trained face detector
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        )
    
    def validate_passport_photo(self, image):
        """Validate passport size photo requirements"""
        errors = []
        
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(100, 100)
        )
        
        # Must have exactly ONE face
        if len(faces) == 0:
            errors.append('No face detected in photo. Please upload a clear passport size photo')
            return {'valid': False, 'errors': errors}
        
        if len(faces) > 1:
            errors.append('Multiple faces detected. Only ONE person allowed in passport photo')
            return {'valid': False, 'errors': errors}
        
        # Get face coordinates
        (x, y, w, h) = faces[0]
        
        # Check if face is centered
        img_center_x = image.shape[1] / 2
        face_center_x = x + w / 2
        
        if abs(face_center_x - img_center_x) > image.shape[1] * 0.2:
            errors.append('Face is not centered. Please center your face in the photo')
        
        # Check if face occupies appropriate portion of image
        face_area = w * h
        img_area = image.shape[0] * image.shape[1]
        face_ratio = face_area / img_area
        
        if face_ratio < 0.15:
            errors.append('Face is too small. Please move closer or crop the photo')
        elif face_ratio > 0.6:
            errors.append('Face is too close. Please move back slightly')
        
        # Check for sunglasses (look for dark regions on eyes)
        face_roi = gray[y:y+h, x:x+w]
        eye_region = face_roi[int(h*0.2):int(h*0.5), :]
        eye_darkness = np.mean(eye_region)
        
        if eye_darkness < 40:
            errors.append('Remove sunglasses or dark glasses from photo')
        
        # Check background uniformity (should be plain)
        # Sample pixels from corners (background area)
        corners = [
            gray[0:50, 0:50],
            gray[0:50, -50:],
            gray[-50:, 0:50],
            gray[-50:, -50:]
        ]
        
        corner_stds = [np.std(corner) for corner in corners]
        avg_corner_std = np.mean(corner_stds)
        
        if avg_corner_std > 30:
            errors.append('Background should be plain/uniform. Please use a simple background')
        
        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'face_detected': True,
            'face_count': len(faces),
            'face_position': {
                'x': int(x),
                'y': int(y),
                'width': int(w),
                'height': int(h)
            }
        }
