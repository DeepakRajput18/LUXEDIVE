import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const documentService = {
  /**
   * Upload and validate document using backend OCR service
   */
  async uploadDocument(
    userId: string, 
    bookingId: string,
    file: File, 
    documentType: 'aadhaar_front' | 'aadhaar_back' | 'dl_front' | 'dl_back' | 'passport_photo',
    side?: 'front' | 'back'
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('bookingId', bookingId);
    formData.append('documentType', documentType);
    if (side) formData.append('side', side);

    try {
      const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Document upload failed:', error);
      throw error.response?.data || error;
    }
  },

  /**
   * Check if all mandatory documents have been uploaded for a booking
   */
  async checkCompletion(userId: string, bookingId: string) {
    try {
      // This will call the check-complete endpoint which we should ensure exists in new backend
      const response = await axios.post(`${API_BASE_URL}/documents/check-complete`, {
        userId,
        bookingId
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data || { success: false, complete: false };
    }
  }
}
