import { supabase } from '../supabase'

export type Settings = {
    id: string
    clinic_name: string
    doctor_name: string
    phone: string
    whatsapp: string
    email: string
    address: string
    facebook: string | null
    instagram: string | null
    youtube: string | null
}

export type WorkingHour = {
    id: string
    day: string
    is_open: boolean
    from_time: string | null
    to_time: string | null
}

// جلب الإعدادات
export const GetSettings = async (): Promise<Settings | null> => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

    if (error) throw error
    return data
}

// تحديث الإعدادات
export const UpdateSettings = async (settings: Partial<Settings>) => {
    const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .single()

    const { error } = await supabase
        .from('settings')
        .update(settings)
        .eq('id', existing?.id)

    if (error) throw error
}

// جلب أوقات العمل
export const GetWorkingHours = async (): Promise<WorkingHour[]> => {
    const { data, error } = await supabase
        .from('working_hours')
        .select('*')

    if (error) throw error
    return data ?? []
}

// تحديث يوم معين
export const UpdateWorkingHour = async (hour: WorkingHour) => {
    const { error } = await supabase
        .from('working_hours')
        .update({
            is_open: hour.is_open,
            from_time: hour.from_time,
            to_time: hour.to_time,
        })
        .eq('id', hour.id)

    if (error) throw error
}