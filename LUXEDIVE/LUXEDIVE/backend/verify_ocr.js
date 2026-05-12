const fs = require('fs');
const path = require('path');
const { recognizeDocument } = require('./services/ocrService');

async function runTest() {
  console.log('🚀 Starting OCR Verification Test...');

  // 1. Test with the 'Dashboard' image (should be REJECTED)
  const badImagePath = path.join('C:', 'Users', 'deepa', '.gemini', 'antigravity', 'brain', 'e77abb06-7a5a-4513-ab17-d0eb7d2a3fcd', 'invalid_doc_test_1776329419068.png');
  
  if (!fs.existsSync(badImagePath)) {
    console.error('❌ Test image not found at:', badImagePath);
    return;
  }

  const badBuffer = fs.readFileSync(badImagePath);
  console.log('--- Testing Invalid Document (Car Dashboard) ---');
  const result1 = await recognizeDocument(badBuffer, 'dl_front');
  console.log('Result:', result1.recognized ? 'ACCEPTED (FAIL)' : 'REJECTED (PASS)');
  console.log('Keywords Found:', result1.matches);
  console.log('Text Detected:', result1.text.substring(0, 50) + '...');

  if (!result1.recognized) {
    console.log('✅ TEST PASSED: Non-ID photo correctly rejected.');
  } else {
    console.error('❌ TEST FAILED: Non-ID photo was accepted.');
  }

  console.log('\n--- Testing Selfie Exemption ---');
  const result2 = await recognizeDocument(badBuffer, 'passport_photo');
  console.log('Result:', result2.recognized ? 'ACCEPTED (PASS)' : 'REJECTED (FAIL)');
  if (result2.recognized) {
      console.log('✅ TEST PASSED: Selfie slot remains exempt from OCR as requested.');
  }

  process.exit(0);
}

runTest().catch(err => {
  console.error('Test Execution Error:', err);
  process.exit(1);
});
