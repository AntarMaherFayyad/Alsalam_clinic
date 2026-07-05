import { supabase } from '../supabase'

export type Education = {
    degree: string
    university: string
    year: string
}

export type Doctor = {
    id: string
    name: string
    title: string
    bio: string
    experience: number
    image: string
    education: Education[]
    certifications: string[]
    created_at: string
}

export const GetDoctor = async (): Promise<Doctor | null> => {
    const { data, error } = await supabase
        .from('doctor')
        .select('*')
        .single()

    if (error) throw error
    return data
}

export const UpdateDoctor = async (doctor: Partial<Doctor>) => {
    const { data: existing } = await supabase
        .from('doctor')
        .select('id')
        .single()

    const { error } = await supabase
        .from('doctor')
        .update(doctor)
        .eq('id', existing?.id)

    if (error) throw error
}
export const UploadDoctorImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('doctor-images')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('doctor-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}