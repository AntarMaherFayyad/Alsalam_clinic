// src/lib/admin/services.ts
import { supabase } from '../supabase'

export type Service = {
  id: string
  title: string
  description: string
  icon: string
  is_active: boolean
  price: number
  visible: boolean
  image_url: string | null
  created_at: string
}
// جلب كل الخدمات
export const GetServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// إضافة خدمة
export const CreateService = async (service: Omit<Service, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single()

  if (error) throw error
  return data
}
export const UploadServiceImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`

  const { error } = await supabase.storage
    .from('services-images')
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('services-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

// تعديل خدمة
export const UpdateService = async (service: Service) => {
  const { id, created_at, ...rest } = service 
  const { data, error } = await supabase
    .from('services')
    .update(rest) 
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
// حذف خدمة
export const DeleteService = async (id: string) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) throw error
}
