const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');
const { supabase } = require('../config/supabase');
const { recognizeDocument } = require('../services/ocrService');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPG and PNG formats are allowed'));
    }
    cb(null, true);
  }
});

// Generate image hash for duplicate detection
async function generateImageHash(buffer) {
  const hash = crypto.createHash('sha256');
  hash.update(buffer);
  return hash.digest('hex');
}

// Check image quality (documentType-aware, fast)
async function validateImageQuality(buffer, documentType) {
  try {
    const metadata = await sharp(buffer).metadata();
    
    // Quality and OCR checks removed as per user request: "any image as place of this document, not need to check"
    
    return {
      valid: true,
      errors: [],
      metadata: { width: metadata.width, height: metadata.height, format: metadata.format, brightness: 100 }
    };
  } catch (error) {
    console.error('Metadata extraction error:', error);
    // Even if sharp fails, allow upload as per user request
    return { valid: true, errors: [], metadata: {} };
  }
}


// Upload document wrapper to catch Multer errors gracefully
router.post('/upload', (req, res, next) => {
  upload.single('document')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File size exceeds 5MB limit',
          popup: {
            title: '📁 File Too Large',
            message: 'File size exceeds 5MB limit.\\n\\nPlease compress the image and upload again.',
            type: 'error'
          }
        });
      }
      return res.status(400).json({ success: false, error: err.message });
    } else if (err) {
      return res.status(400).json({
        success: false,
        error: err.message,
        popup: {
          title: '❌ Upload Error',
          message: err.message,
          type: 'error'
        }
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { userId, bookingId, documentType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    if (!userId || !bookingId || !documentType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, bookingId, documentType'
      });
    }

    // VALIDATION 1: Check allowed document types
    const allowedTypes = ['aadhaar_front', 'aadhaar_back', 'dl_front', 'dl_back', 'passport_photo'];
    const forbiddenTypes = ['passport', 'pan_card', 'voter_id', 'other'];

    if (!allowedTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid document type. Only Aadhaar, Driving License and Passport Photo are allowed',
        popup: {
          title: '❌ Invalid Document',
          message: 'Only the following documents are allowed:\\n• Aadhaar (Front & Back)\\n• Driving License (Front & Back)\\n• Passport Size Photo\\n\\nNo Passport, PAN Card, or Voter ID',
          type: 'error'
        }
      });
    }

    if (forbiddenTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        error: 'This document type is not allowed',
        popup: {
          title: '🚫 Document Not Allowed',
          message: 'Passport, PAN Card, and Voter ID are NOT accepted. Please upload only Aadhaar, Driving License, and Photo.',
          type: 'error'
        }
      });
    }

    // VALIDATION 2: File size check
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds 5MB',
        popup: {
          title: '📁 File Too Large',
          message: `File size: ${(file.size / (1024 * 1024)).toFixed(2)}MB\\nMaximum allowed: 5MB\\n\\nPlease compress the image and try again.`,
          type: 'error'
        }
      });
    }

    const qualityCheck = await validateImageQuality(file.buffer, documentType);
    if (!qualityCheck.valid) {
      console.warn(`[UPLOAD REJECTED] Quality check failed for ${documentType}:`, qualityCheck.errors);
      return res.status(400).json({
        success: false,
        error: qualityCheck.errors[0],
        popup: {
          title: '📷 Image Quality Issue',
          message: qualityCheck.errors.join('\\n\\n'),
          type: 'error'
        }
      });
    }
    console.log(`[UPLOAD] Quality check passed for ${documentType}`);

    // VALIDATION 4: Generate image hash
    const imageHash = await generateImageHash(file.buffer);

    // VALIDATION 5: Check for duplicates using database function
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${userId}/${bookingId}/${documentType}_${Date.now()}.${fileExtension}`;

    const { data: validationResult, error: validationError } = await supabase
      .rpc('validate_document_upload', {
        p_user_id: userId,
        p_booking_id: bookingId,
        p_document_type: documentType,
        p_file_url: fileName,
        p_file_size_bytes: file.size,
        p_file_extension: fileExtension,
        p_image_hash: imageHash
      });

    if (validationError) {
      console.error('Validation function error:', validationError);
      return res.status(500).json({
        success: false,
        error: 'Validation failed',
        popup: {
          title: '⚠️ Validation Error',
          message: 'Document validation failed. Please try again.',
          type: 'error'
        }
      });
    }

    if (!validationResult.valid) {
      console.warn(`[UPLOAD REJECTED] DB Validation failed for ${documentType}:`, validationResult.errors);
      return res.status(400).json({
        success: false,
        error: validationResult.errors[0],
        errors: validationResult.errors,
        popup: {
          title: '❌ Validation Failed',
          message: validationResult.errors.join('\\n\\n'),
          type: 'error'
        }
      });
    }
    console.log(`[UPLOAD] DB Validation passed for ${documentType}`);

    // UPLOAD TO SUPABASE STORAGE
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('user-documents')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return res.status(500).json({
        success: false,
        error: 'Failed to upload document',
        popup: {
          title: '❌ Upload Failed',
          message: 'Could not upload document. Please try again.',
          type: 'error'
        }
      });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('user-documents')
      .getPublicUrl(fileName);

    // SUCCESS RESPONSE
    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        documentType: documentType,
        url: publicUrl,
        fileName: fileName,
        size: file.size,
        quality: qualityCheck.metadata
      },
      popup: {
        title: '✅ Upload Successful',
        message: `${documentType.replace('_', ' ').toUpperCase()} uploaded successfully`,
        type: 'success'
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      popup: {
        title: '❌ Upload Error',
        message: 'An error occurred while uploading. Please try again.',
        type: 'error'
      }
    });
  }
});

// Check if all documents uploaded
router.post('/check-complete', async (req, res) => {
  try {
    const { userId, bookingId } = req.body;

    const { data: result, error } = await supabase
      .rpc('check_all_documents_uploaded', {
        p_user_id: userId,
        p_booking_id: bookingId
      });

    if (error) throw error;

    if (!result.complete) {
      return res.status(400).json({
        success: false,
        complete: false,
        missing: result.missing,
        popup: {
          title: '📄 Missing Documents',
          message: `Please upload the following documents:\\n\\n${result.missing.map(doc => '• ' + doc.replace('_', ' ').toUpperCase()).join('\\n')}\\n\\nAll 5 documents are mandatory.`,
          type: 'warning'
        }
      });
    }

    res.json({
      success: true,
      complete: true,
      message: result.message
    });

  } catch (error) {
    console.error('Check documents error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Validate name match
router.post('/validate-names', async (req, res) => {
  try {
    const { bookingId } = req.body;

    const { data: result, error } = await supabase
      .rpc('validate_document_name_match', {
        p_booking_id: bookingId
      });

    if (error) throw error;

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        valid: false,
        error: result.error,
        popup: {
          title: '⚠️ Name Mismatch',
          message: result.error,
          type: 'error'
        }
      });
    }

    res.json({
      success: true,
      valid: true,
      message: result.message,
      name: result.name
    });

  } catch (error) {
    console.error('Name validation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
