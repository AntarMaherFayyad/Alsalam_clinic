'use server'

import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }
  }

  // حفظ الـ token في الـ cookies
  const cookieStore = await cookies()
  cookieStore.set('sb-token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // أسبوع
    path: '/',
  })

  redirect('/admin/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('sb-token')
  redirect('/admin')  // ← غير من /admin/login لـ /admin
}
export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-token')?.value
  return token ?? null
}
export async function checkAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-token')?.value

  if (!token) {
    redirect('/admin')  // ← غير من /admin/login لـ /admin
  }

  return token
}