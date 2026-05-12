import { supabase } from '../lib/supabaseClient'

export type AdminActionType = 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'other'
export type EntityType = 'booking' | 'user' | 'vehicle' | 'document' | 'promotion' | 'system'

interface LogParams {
    action: string
    action_type: AdminActionType
    entity_type: EntityType
    entity_id: string
    old_value?: any
    new_value?: any
}

export const logAdminAction = async ({
    action,
    action_type,
    entity_type,
    entity_id,
    old_value,
    new_value
}: LogParams) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase.from('system_logs').insert({
            user_id: user.id, // The admin performing the action
            action, // Human readable description e.g. "Approved Booking #123"
            action_type,
            entity_type,
            entity_id,
            old_value: old_value || null,
            new_value: new_value || null,
            ip_address: 'web-client'
        })

        if (error) {
            console.error('Failed to log admin action:', error)
        }
    } catch (err) {
        console.error('Error logging admin action:', err)
    }
}
