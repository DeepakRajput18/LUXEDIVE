/**
 * Shared Fast2SMS helper for Deno Edge Functions
 */
export async function sendFast2SMS(mobile: string, message: string) {
    const FAST2SMS_API_KEY = Deno.env.get('FAST2SMS_API_KEY');
    
    if (!FAST2SMS_API_KEY) {
        console.error('❌ FAST2SMS_API_KEY is missing in Edge Function secrets');
        return { success: false, error: 'API Key missing' };
    }

    // Clean number to 10 digits
    const cleanNumber = mobile.replace(/\D/g, '').slice(-10);
    if (cleanNumber.length !== 10) {
        return { success: false, error: 'Invalid number format' };
    }

    const url = 'https://www.fast2sms.com/dev/bulkV2';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': FAST2SMS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                route: 'q',
                message: message,
                language: 'english',
                flash: 0,
                numbers: cleanNumber
            })
        });

        const data = await response.json();
        console.log(`📡 [Shared Fast2SMS] To ${cleanNumber}:`, data.return ? 'Success' : 'Fail');
        
        return { 
            success: data.return === true, 
            message: data.message?.[0] || 'Processed',
            data: data
        };
    } catch (error) {
        console.error('❌ Fast2SMS Fetch Error:', error);
        return { success: false, error: error.message };
    }
}
