const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const { supabase } = require('../config/supabase');

const upload = multer({ storage: multer.memoryStorage() });

const PYTHON_OCR_URL = process.env.PYTHON_OCR_URL || 'http://localhost:8000';

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { userId, bookingId, documentType, side } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // STEP 1: Call Python OCR Microservice for validation
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    formData.append('document_type', documentType);
    if (side) formData.append('side', side);

    console.log(`Calling Python OCR for ${documentType}...`);
    const ocrResponse = await axios.post(`${PYTHON_OCR_URL}/validate-document`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const validation = ocrResponse.data;

    if (!validation.valid) {
      return res.status(400).json({
        error: 'Document validation failed',
        details: validation.errors
      });
    }

    // STEP 2: Duplicate detection using image hash
    if (validation.image_hash) {
      const { data: existingDoc } = await supabase
        .from('document_image_hashes')
        .select('*')
        .eq('image_hash', validation.image_hash)
        .single();
      
      if (existingDoc && existingDoc.user_id !== userId) {
        return res.status(400).json({
          error: 'SECURITY ALERT: This document has already been used by another user'
        });
      }
    }

    // STEP 3: Upload file to Supabase Storage
    const fileName = `${userId}/${bookingId}/${documentType}_${Date.now()}.jpg`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user-documents')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (uploadError) throw uploadError;

    // STEP 4: Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-documents')
      .getPublicUrl(fileName);

    // STEP 5: Store image hash
    if (validation.image_hash) {
      await supabase.from('document_image_hashes').insert({
        user_id: userId,
        booking_id: bookingId,
        document_type: documentType,
        image_hash: validation.image_hash,
        file_url: publicUrl
      });
    }

    // STEP 6: Store extracted data in user_documents table
    const documentData = {
      user_id: userId,
      booking_id: bookingId,
      verification_status: 'pending',
      validation_metadata: validation.validations,
      auto_validation_status: 'passed',
      image_quality_score: validation.validations?.quality?.metrics?.blur_score || 0,
      blur_score: validation.validations?.quality?.metrics?.blur_score || 0
    };

    // Add document-specific URLs
    documentData[`${documentType}_url`] = publicUrl;

    // Add extracted data
    if (validation.extracted_data) {
      if (documentType.startsWith('aadhaar')) {
        documentData.aadhaar_number = validation.extracted_data.aadhaar_number;
        documentData.aadhaar_name = validation.extracted_data.name;
        documentData.aadhaar_dob = validation.extracted_data.dob;
      } else if (documentType.startsWith('dl')) {
        documentData.license_number = validation.extracted_data.dl_number;
        documentData.dl_name = validation.extracted_data.name;
        documentData.license_expiry = validation.extracted_data.date_of_issue;
      }
    }

    // Upsert to user_documents
    const { error: dbError } = await supabase
      .from('user_documents')
      .upsert(documentData, { onConflict: 'user_id,booking_id' });

    if (dbError) throw dbError;

    res.json({
      message: 'Document verified and uploaded successfully',
      publicUrl,
      extractedData: validation.extracted_data
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Internal server error during document processing',
      details: error.message 
    });
  }
});

module.exports = router;
