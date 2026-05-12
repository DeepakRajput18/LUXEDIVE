import { supabase } from '../lib/supabaseClient';

type EventType =
    | 'page_visit'
    | 'vehicle_view'
    | 'search'
    | 'wishlist_add'
    | 'wishlist_remove'
    | 'booking_start'
    | 'booking_success'
    | 'payment_success'
    | 'payment_failed';

interface TrackEventParams {
    eventType: EventType;
    vehicleId?: string;
    page: string;
    metadata?: Record<string, any>;
}

// Simple session ID generator for anonymous users tracking
const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('luxedive_session_id');
    if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('luxedive_session_id', sessionId);
    }
    return sessionId;
};

export const trackEvent = async ({ eventType, vehicleId, page, metadata = {} }: TrackEventParams) => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        const sessionId = getOrCreateSessionId();

        const { error } = await supabase.functions.invoke('track-event', {
            body: {
                event_type: eventType,
                user_id: userId,
                session_id: sessionId,
                vehicle_id: vehicleId,
                page,
                metadata
            }
        });

        if (error) {
            console.error('Analytics track error:', error);
        }
    } catch (err) {
        // Analytics errors should never break the main app flow
        console.error('Silent analytics error:', err);
    }
};
