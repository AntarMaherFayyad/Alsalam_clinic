import { supabase } from '../supabase'

export type Message = {
  id: string
  full_name: string
  email: string | null
  phone: string
  subject: string // ✅ إضافة الـ subject هنا ليتطابق مع حقل الـ Database
  message: string
  is_read: boolean
  created_at: string
}

export const GetMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export const MarkAsRead = async ({ id, status }: { id: string; status: 'unread' | 'read' | 'replied' }) => {
  const isReadBoolean = status === 'read' || status === 'replied';

  const { error } = await supabase
    .from('messages')
    .update({ is_read: isReadBoolean })
    .eq('id', id)  // ← ناقص ده

  if (error) throw error
}
export const DeleteMessage = async (id: string) => {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const SendMessage = async (messageData: {
  full_name: string
  phone: string
  email: string | null
  subject: string
  message: string
}) => {
  const { error } = await supabase
    .from('messages')
    .insert({
      full_name: messageData.full_name,
      phone: messageData.phone,
      email: messageData.email,
      subject: messageData.subject,
      message: messageData.message,
      is_read: false // الحالة الافتراضية للرسالة الجديدة
    })

  if (error) throw error
}