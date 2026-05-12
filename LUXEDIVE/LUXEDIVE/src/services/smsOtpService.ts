const API_URL = 'https://luxedive.onrender.com/api/auth';

export const smsOtpService = {
    async sendOTP(phone: string) {
        try {
            // Clean phone (removing spaces/special characters)
            const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');

            const response = await fetch(`${API_URL}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: cleanPhone, type: 'sms' })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to send OTP via custom backend');
            }

            return {
                success: true,
                message: 'OTP sent to your phone'
            };

        } catch (error: any) {
            console.error('Send OTP error:', error);
            return {
                success: false,
                message: error.message || 'Failed to send OTP'
            };
        }
    },

    async verifyOTP(phone: string, otp: string) {
        try {
            const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9]/g, '');

            const response = await fetch(`${API_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: cleanPhone, otp })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Verification failed');
            }

            return {
                success: true,
                message: data.message || 'Verified'
            };

        } catch (error: any) {
            console.error('Verify OTP error:', error);
            return {
                success: false,
                message: error.message || 'Verification failed'
            };
        }
    }
};
