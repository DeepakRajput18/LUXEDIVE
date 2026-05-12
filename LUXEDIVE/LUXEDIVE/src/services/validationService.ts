import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ValidationResponse {
    success: boolean;
    valid: boolean;
    reason?: string;
    corrected?: {
        date: string;
        time: string;
    };
    popup?: {
        title: string;
        message: string;
        type: 'warning' | 'info' | 'error';
        duration: number;
    };
    autoCorrect?: {
        date: string;
        time: string;
    };
}

/**
 * Show a premium, non-intrusive timed popup notification
 */
export const showTimedPopup = (data: { title: string; message: string; type: string; duration: number }) => {
    // Prevent duplicates
    const existing = document.getElementById('lxd-validation-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'lxd-validation-popup';
    popup.className = `fixed top-8 right-8 z-[9999] w-96 p-6 rounded-[2rem] border backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-slide-down ${
        data.type === 'warning' 
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
    }`;

    popup.innerHTML = `
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center bg-current/10">
                    <span class="text-lg">${data.type === 'warning' ? '⏰' : '✅'}</span>
                </div>
                <h4 class="text-sm font-black uppercase tracking-[0.2em] font-serif">${data.title}</h4>
            </div>
            <p class="text-xs text-white/80 font-medium leading-relaxed tracking-wide mt-2">${data.message}</p>
            <div class="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                <div class="h-full bg-current transition-all duration-[2000ms] ease-linear w-full" id="lxd-progress"></div>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Progress bar animation
    setTimeout(() => {
        const progress = document.getElementById('lxd-progress');
        if (progress) progress.style.width = '0%';
    }, 10);

    // Removal
    setTimeout(() => {
        popup.classList.replace('animate-slide-down', 'animate-slide-up');
        setTimeout(() => popup.remove(), 500);
    }, data.duration || 2000);
};

export const validationService = {
    /**
     * Validate pickup time against 3-hour buffer
     */
    async validatePickupTime(date: Date): Promise<ValidationResponse> {
        try {
            const response = await fetch(`${API_URL}/api/validation/validate-pickup-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pickupDate: format(date, 'yyyy-MM-dd'),
                    pickupTime: format(date, 'HH:mm:ss')
                })
            });
            const result = await response.json();
            
            if (!result.valid && result.popup) {
                showTimedPopup(result.popup);
            }
            
            return result;
        } catch (error) {
            console.error('Pickup validation failed:', error);
            return { success: false, valid: true }; // Fail open for UX
        }
    },

    /**
     * Validate drop time against 6-hour gap
     */
    async validateDropTime(pickupDate: Date, dropDate: Date): Promise<ValidationResponse> {
        try {
            const response = await fetch(`${API_URL}/api/validation/validate-drop-time`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pickupDate: format(pickupDate, 'yyyy-MM-dd'),
                    pickupTime: format(pickupDate, 'HH:mm:ss'),
                    dropDate: format(dropDate, 'yyyy-MM-dd'),
                    dropTime: format(dropDate, 'HH:mm:ss')
                })
            });
            const result = await response.json();
            
            if (!result.valid && result.popup) {
                showTimedPopup(result.popup);
            }
            
            return result;
        } catch (error) {
            console.error('Drop validation failed:', error);
            return { success: false, valid: true };
        }
    }
};
