'use client'

import { useTransition, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/lib/admin/admin-auth'
import {
  LogOut,
  Menu,
  ExternalLink,
  LayoutDashboard,
  Calendar,
  Stethoscope,
  FileText,
  Users,
  MessageSquare,
  Settings
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { siteSettings } from '@/lib/data'
import { cn } from '@/lib/utils'

// نفس الروابط الموجودة في السايدبار
const navItems = [
  { href: '/admin/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/admin/dashboard/appointments', label: 'المواعيد', icon: Calendar },
  { href: '/admin/dashboard/services', label: 'الخدمات', icon: Stethoscope },
  { href: '/admin/dashboard/articles', label: 'المقالات', icon: FileText },
  { href: '/admin/dashboard/patients', label: 'المرضى', icon: Users },
  { href: '/admin/dashboard/messages', label: 'الرسائل', icon: MessageSquare },
  { href: '/admin/dashboard/settings', label: 'الإعدادات', icon: Settings },
]

export function AdminHeader() {
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 shadow-sm relative z-40">

      {/* القائمة الجانبية للموبايل والتابلت باستخدام Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>

        <SheetTrigger
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors border border-slate-100 focus:outline-none"
          aria-label="القائمة"
        >
          <Menu className="w-5 h-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-64 p-0 border-l border-slate-100 bg-white flex flex-col h-full [&>button]:hidden"
          dir="rtl"
        >
          {/* الهيدر الخاص بالقائمة الجانبية للموبايل */}
          <div className="p-6 border-b border-slate-50 flex flex-col gap-1">
            <SheetTitle className="text-slate-800 font-extrabold text-base tracking-tight truncate">
              {siteSettings.clinicName}
            </SheetTitle>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b6a6b] animate-pulse" />
              <p className="text-slate-400 text-[11px] font-semibold tracking-wide">بوابة الإدارة الطبية</p>
            </div>
          </div>

          {/* الروابط داخل الموبايل */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = item.href === '/admin'
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group relative',
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
                      'w-5 h-5 transition-all duration-300',
                      isActive ? 'text-[#0b6a6b] stroke-[2.2]' : 'text-slate-400 group-hover:text-[#0b6a6b]'
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* أزرار الأسفل داخل الموبايل (المعاينة) */}
          <div className="p-4 border-t border-slate-50 bg-slate-50/50">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-[#0b6a6b] bg-white hover:bg-[#0b6a6b]/5 border border-slate-200/60 transition-all duration-300 group shadow-sm"
            >
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0b6a6b]" />
              <span>معاينة الموقع العام</span>
            </a>
          </div>
        </SheetContent>
      </Sheet>

      {/* عنوان الترحيب للشاشات الكبيرة */}
      <div className="hidden lg:block">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          مرحباً بك في <span className="text-slate-800 font-bold">لوحة الإدارة الطبية</span>
        </p>
      </div>

      {/* الأدوات الجانبية: حساب المسؤول */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 px-3 py-1.5 transition-colors focus:outline-none">
            <Avatar className="w-8 h-8 rounded-xl border border-slate-100">
              <AvatarFallback className="bg-[#0b6a6b]/10 text-[#0b6a6b] text-xs font-black">
                A
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-xs sm:text-sm font-bold text-slate-700">
              المشرف العام
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-48 rounded-xl border-slate-100 p-1.5 shadow-xl shadow-slate-100/80 bg-white">
            <DropdownMenuItem>
              <span className="text-xs sm:text-sm text-slate-500">
                {`مرحباً بك في ${siteSettings.clinicName}`}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={pending}
              className={cn(
                "text-rose-600 focus:text-rose-700 focus:bg-rose-50 font-bold rounded-lg gap-2.5 cursor-pointer text-xs sm:text-sm py-2.5 px-3 transition-colors",
                pending && "opacity-60 cursor-not-allowed"
              )}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>{pending ? 'جاري الخروج...' : 'تسجيل الخروج'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}