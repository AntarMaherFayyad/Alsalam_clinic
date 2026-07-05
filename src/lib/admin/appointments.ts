import { supabase } from '../supabase'

export type Appointment = {
  id: string
  patient_name: string
  phone: string
  email: string | null
  service: string
  date: string
  time: string
  reason: string | null
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
}

// جلب كل المواعيد
export const GetAppointments = async (): Promise<Appointment[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// تغيير حالة الموعد
export const UpdateAppointmentStatus = async ({ id, status }: { id: string; status: Appointment['status'] }) => {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}

// حذف موعد
export const DeleteAppointment = async (id: string) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// إضافة موعد جديد من صفحة الـ booking
export const CreateAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at' | 'status'>) => {
  const { error } = await supabase
    .from('appointments')
    .insert({ ...appointment, status: 'pending' })

  if (error) throw error
}