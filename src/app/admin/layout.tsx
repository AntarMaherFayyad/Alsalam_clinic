import type { Metadata } from 'next'
import { logoutAction } from '@/lib/admin/admin-auth'
import { LogOut } from 'lucide-react'
import "../globals.css"

export const metadata: Metadata = {
  title: 'لوحة التحكم — عيادة السالم',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* شريط علوي */}
      {/* <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-slate-800 text-sm">عيادة السالم — لوحة التحكم</h1>

      
  
      </header> */}

      <main className="p-6">
        {children}
      </main>
    </div>
  )
}