import { supabase } from '../supabase'

export type Patient = {
  patient_name: string
  phone: string
  email: string | null
  last_visit: string
  visit_count: number
}

// جلب المرضى من جدول الـ appointments
export const GetPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from('appointments')
    .select('patient_name, phone, email, date')
    .order('date', { ascending: false })

  if (error) throw error

  // بنعمل unique بالـ phone
  const seen = new Set<string>()
  const patients: Patient[] = []

  data?.forEach(apt => {
    if (!seen.has(apt.phone)) {
      seen.add(apt.phone)
      patients.push({
        patient_name: apt.patient_name,
        phone: apt.phone,
        email: apt.email,
        last_visit: apt.date,
        visit_count: data.filter(a => a.phone === apt.phone).length
      })
    }
  })

  return patients
}