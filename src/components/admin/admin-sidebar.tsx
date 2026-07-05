'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  FileText,
  Users,
  MessageSquare,
  Settings,
  ExternalLink,
} from 'lucide-react'
import { siteSettings } from '@/lib/data'
import { cn } from '@/lib/utils'
import { logoutAction } from '@/lib/admin/admin-auth'
import { LogOut } from 'lucide-react'


const navItems = [
  { href: '/admin/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/admin/dashboard/appointments', label: 'المواعيد', icon: Calendar },
  { href: '/admin/dashboard/services', label: 'الخدمات', icon: Stethoscope },
  { href: '/admin/dashboard/articles', label: 'المقالات', icon: FileText },
  { href: '/admin/dashboard/patients', label: 'المرضى', icon: Users },
  { href: '/admin/dashboard/messages', label: 'الرسائل', icon: MessageSquare },
  { href: '/admin/dashboard/settings', label: 'الإعدادات', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-l border-slate-100 min-h-screen shrink-0 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b6a6b]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="p-6 border-b border-slate-50 flex flex-col gap-1 relative z-10">
        <p className="text-slate-800 font-extrabold text-base tracking-tight truncate">
          {siteSettings.clinicName}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0b6a6b] animate-pulse" />
          <p className="text-slate-400 text-[11px] font-semibold tracking-wide">بوابة الإدارة الطبية</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 relative z-10 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 group relative',
                isActive
                  ? 'bg-[#0b6a6b]/5 text-[#0b6a6b] border border-[#0b6a6b]/10 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#0b6a6b] border border-transparent'
              )}
            >
              {isActive && (
                <span className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-[#0b6a6b] rounded-l-full" />
              )}

              <item.icon
                className={cn(
                  'w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300',
                  isActive
                    ? 'text-[#0b6a6b] stroke-[2.2]'
                    : 'text-slate-400 group-hover:text-[#0b6a6b] group-hover:scale-105'
                )}
              />
              <span className="tracking-wide">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-50 relative z-10 bg-slate-50/50 backdrop-blur-md">
        <form action={logoutAction}
        >
          <button
            type="submit"
            className=" w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-rose-500 hover:text-rose-600 border border-rose-200 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all duration-300 group shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </form>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0b6a6b] bg-white hover:bg-[#0b6a6b]/5 border border-slate-200/60 transition-all duration-300 group shadow-sm"
        >
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0b6a6b] group-hover:translate-x-0.5 transition-transform" />
          <span>معاينة الموقع العام</span>
        </a>
      </div>
    </aside>
  )
}