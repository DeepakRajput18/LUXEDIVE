const { createWorker } = require('tesseract.js');
const sharp = require('sharp');

/**
 * Keywords to look for in different document types to verify authenticity.
 * We use a "Match Score" - if at least 2 unique keywords are found, we consider it likely a document.
 */
const DOCUMENT_KEYWORDS = {
  aadhaar_front: ['AADHAAR', 'UNIQUE', 'IDENTIFICATION', 'AUTHORITY', 'INDIA', 'GOVERNMENT', 'MALE', 'FEMALE', 'DOB', 'YEAR'],
  aadhaar_back: ['AADHAAR', 'UNIQUE', 'IDENTIFICATION', 'AUTHORITY', 'INDIA', 'ADDRESS', 'VID'],
  dl_front: ['DRIVING', 'LICENSE', 'DL', 'INDIA', 'REPUBLIC', 'AUTHORITY', 'TRANSPORT', 'HIMACHAL', 'GUJARAT', 'MAHARASHTRA', 'KARNATAKA', 'DELHI'],
  dl_back: ['DRIVING', 'LICENSE', 'ADDRESS', 'AUTHORITY', 'TRANSPORT', 'INDIA', 'STAMP', 'DOCKET']
};

/**
 * Recognizes text in an image and verifies if it matches the expected document type.
 * @param {Buffer} buffer - The image buffer.
 * @param {string} type - The expected document type.
 * @returns {Promise<{recognized: boolean, text: string, matches: string[]}>}
 */
async function recognizeDocument(buffer, type) {
  // If it's a selfie, we don't look for keywords (no text expected/required)
  if (type === 'passport_photo' || !DOCUMENT_KEYWORDS[type]) {
    return { recognized: true, text: 'Selfie/Skip', matches: [] };
  }

  let worker = null;
  try {
    // 1. Preprocess image with sharp for better OCR accuracy
    // Convert to grayscale, increase contrast, and sharpen
    const processedBuffer = await sharp(buffer)
      .grayscale()
      .normalize() // Enhances contrast
      .sharpen()
      .toBuffer();

    // 2. Initialize Tesseract Worker
    worker = await createWorker('eng'); // English is standard on Indian IDs

    // 3. Perform Recognition
    const { data: { text } } = await worker.recognize(processedBuffer);
    const upperText = text.toUpperCase();

    // 4. Verify Keywords
    const expectedKeywords = DOCUMENT_KEYWORDS[type];
    const foundKeywords = expectedKeywords.filter(kw => upperText.includes(kw));

    // Threshold: Need at least 1 match for confidence (ID cards are complex)
    const isRecognized = foundKeywords.length >= 1;

    return {
      recognized: isRecognized,
      text: text,
      matches: foundKeywords
    };
  } catch (error) {
    console.error('OCR RECOGNITION ERROR:', error);
    // ❌ BIG FIX: Stop returning recognized: true on technical errors.
    // Return recognized: false to ensure security when the engine fails or times out.
    return { recognized: false, text: 'OCR_SERVICE_ERROR', matches: [] };
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
}

module.exports = {
  recognizeDocument
};
