/**
 * LUXEDIVE Activity Logger Service
 *
 * Central service for logging all user actions.
 * Inserts into `activity_logs` table in Supabase.
 * All failures are silent — never interrupts user flow.
 */

import { supabase } from '../lib/supabaseClient'

export type ActionType =
    | 'user_registered'
    | 'user_login'
    | 'user_logout'
    | 'car_searched'
    | 'car_viewed'
    | 'car_wishlisted'
    | 'car_unwishlisted'
    | 'booking_created'
    | 'booking_cancelled'
    | 'payment_initiated'
    | 'payment_completed'
    | 'payment_failed'
    | 'review_submitted'
    | 'profile_updated'
    | 'otp_sent'
    | 'otp_verified'

interface LogActivityOptions {
    actionType: ActionType
    targetId?: string     // car_id, booking_id, review_id etc.
    details?: Record<string, unknown>
}

/**
 * Log a user action to the activity_logs table.
 * Call this anywhere in the app — it will silently fail if Supabase is down.
 */
export async function logActivity({ actionType, targetId, details }: LogActivityOptions): Promise<void> {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        const deviceInfo = `${navigator.platform} | ${navigator.userAgent.slice(0, 80)}`

        await supabase.from('activity_logs').insert({
            user_id: user?.id ?? null,
            action_type: actionType,
            target_id: targetId ?? null,
            details: details ?? {},
            device_info: deviceInfo,
            // ip_address: handled server-side via Edge Function in production
        })
    } catch {
        // Silent fail — never block user flow
    }
}

/**
 * Log a car view + insert into car_views table.
 */
export async function logCarView(carId: string, carName?: string): Promise<void> {
    const viewStartTime = Date.now()

    try {
        const { data: { user } } = await supabase.auth.getUser()

        await supabase.from('car_views').insert({
            user_id: user?.id ?? null,
            car_id: carId,
        })

        await logActivity({
            actionType: 'car_viewed',
            targetId: carId,
            details: { car_name: carName, view_start: new Date(viewStartTime).toISOString() },
        })
    } catch {
        // Silent fail
    }
}

/**
 * Log a search query + insert into search_queries table.
 * Debounced at call site to avoid too-frequent writes.
 */
export async function logSearch(query: string, filters: Record<string, unknown>, resultsCount: number): Promise<void> {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        await supabase.from('search_queries').insert({
            user_id: user?.id ?? null,
            query,
            filters,
            results_count: resultsCount,
        })

        await logActivity({
            actionType: 'car_searched',
            details: { query, filters, results_count: resultsCount },
        })
    } catch {
        // Silent fail
    }
}

/**
 * Log a login event and create a session record.
 * Returns session_id for logout pairing.
 */
export async function logLogin(userId: string, userName?: string): Promise<string | null> {
    try {
        const deviceInfo = `${navigator.platform} | ${navigator.userAgent.slice(0, 80)}`

        const { data, error } = await supabase.from('user_sessions').insert({
            user_id: userId,
            device_info: deviceInfo,
            status: 'active',
            login_at: new Date().toISOString(),
        }).select('id').single()

        if (error) console.warn('[activityLogger] session insert error:', error.message)

        await supabase.from('activity_logs').insert({
            user_id: userId,
            action_type: 'user_login',
            details: { user_name: userName },
            device_info: deviceInfo,
        })

        return data?.id ?? null
    } catch (e) {
        console.warn('[activityLogger] logLogin failed:', e)
        return null
    }
}

/**
 * Log a logout event and close the session record.
 */
export async function logLogout(userId: string, sessionId?: string | null): Promise<void> {
    try {
        if (sessionId) {
            const { data: session } = await supabase
                .from('user_sessions')
                .select('login_at')
                .eq('id', sessionId)
                .single()

            const duration = session?.login_at
                ? Math.floor((Date.now() - new Date(session.login_at).getTime()) / 1000)
                : null

            await supabase.from('user_sessions').update({
                logout_at: new Date().toISOString(),
                duration_seconds: duration,
                status: 'closed',
            }).eq('id', sessionId)
        }

        await supabase.from('activity_logs').insert({
            user_id: userId,
            action_type: 'user_logout',
            details: {},
        })
    } catch (e) {
        console.warn('[activityLogger] logLogout failed:', e)
    }
}
