'use client'

import { useTransition } from 'react'
import { logoutAction } from '@/lib/admin/admin-auth'
import { LogOut, Menu, Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

// import { GetUsers } from '@/lib/admin/auth'
// import { useQuery } from '@tanstack/react-query'


export function AdminHeader() {
  const [pending, startTransition] = useTransition()

//   const { data:  users = [] ,isLoading, isError } = useQuery({
//     queryKey: ['users'],
//     queryFn: GetUsers,
//   });
//   if (isLoading) return <p>جاري التحميل...</p>
// if (isError) return <p>حصل خطأ!</p>
  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 shadow-sm relative z-40">

      <button
        className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors border border-slate-100"
        aria-label="القائمة"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="hidden lg:block">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          مرحباً بك في <span className="text-slate-800 font-bold">لوحة الإدارة الطبية</span>
        </p>
      </div>

      {/* الأدوات الجانبية: الإشعارات وحساب المسؤول */}
      <div className="flex items-center gap-3">



        <DropdownMenu>
          {/* تم إزالة الـ asChild والزر اليدوي لمنع خطأ button inside button */}
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 px-3 py-1.5 transition-colors focus:outline-none">
            <Avatar className="w-8 h-8 rounded-xl border border-slate-100">
              <AvatarFallback className="bg-[#0b6a6b]/10 text-[#0b6a6b] text-xs font-black">
                {/* {users?.[0]?.name?.charAt(0) || 'A'} */}
                A
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-xs sm:text-sm font-bold text-slate-700">
              {/* {users?.[0]?.name || 'المشرف العام'} */}
              المشرف العام
              </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-48 rounded-xl border-slate-100 p-1.5 shadow-xl shadow-slate-100/80 bg-white">
            <DropdownMenuItem>
              <span className="text-xs sm:text-sm text-slate-500">
                {/* {users?.[0]?.email || 'البريد الإلكتروني'} */}
                البريد الإلكتروني
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