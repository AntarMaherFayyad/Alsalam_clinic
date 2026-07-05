
"use client"
import { useState } from 'react'
import { usePatients } from '@/components/hooks/usePatients'
import { Users, Phone, Mail, Calendar, Search, MoreVertical, FileText, UserMinus, Edit3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function PatientsAdminPage() {
  const { data: patients = [], isLoading, isError } = usePatients()
  const [search, setSearch] = useState('')

  // فلترة بالبحث
  const filtered = patients.filter(p =>
    p.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  if (isLoading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-xl w-1/4" />
      <div className="h-24 bg-slate-100 rounded-2xl" />
      <div className="h-64 bg-slate-100 rounded-2xl" />
    </div>
  )

  if (isError) return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
      <p className="text-rose-500 font-bold text-sm">حدث خطأ أثناء تحميل المرضى.</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-xl text-xs">إعادة المحاولة</button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">سجل المرضى</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light">إدارة ومتابعة ملفات المرضى والمراجعين المسجلين في العيادة</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl md:w-72 shrink-0">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-2xl font-black text-[#0b6a6b] font-mono tracking-tight">{patients.length}</p>
              <p className="text-slate-400 text-xs font-bold mt-0.5 tracking-wide">إجمالي المرضى المسجلين</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0b6a6b]/10 flex items-center justify-center text-[#0b6a6b]">
              <Users className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مريض بالاسم أو رقم الهاتف..."
            className="w-full pr-11 pl-4 h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b] text-sm"
          />
        </div>
      </div>

      <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#0b6a6b]" />
            <span>قائمة المرضى المراجعين</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 border border-dashed border-slate-100 rounded-2xl">
              <p className="text-sm font-medium">لا يوجد مرضى مسجلين حالياً</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((patient, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50/60 rounded-2xl border border-slate-100/70 hover:border-[#0b6a6b]/20 hover:shadow-sm hover:bg-white transition-all duration-300">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#0b6a6b]/10 border border-[#0b6a6b]/10 flex items-center justify-center shrink-0 text-[#0b6a6b] font-black text-base">
                      {patient.patient_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{patient.patient_name}</p>
                      <div className="flex items-center gap-4 mt-1 flex-wrap">
                        <a href={`tel:${patient.phone}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-[#0b6a6b]">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span dir="ltr">{patient.phone}</span>
                        </a>
                        {patient.email && (
                          <a href={`mailto:${patient.email}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-[#0b6a6b]">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate">{patient.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/60 shrink-0">
                    <div className="flex flex-col sm:items-end gap-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>آخر زيارة: <span className="font-mono text-slate-500">{patient.last_visit}</span></span>
                      </div>
                      <div className="bg-white border border-slate-100 rounded-xl px-2.5 py-0.5 shadow-sm flex items-center gap-1 w-max">
                        <span className="text-xs font-black text-[#0b6a6b] font-mono">{patient.visit_count}</span>
                        <span className="text-[10px] text-slate-400 font-bold">زيارات</span>
                      </div>
                    </div>

                    <DropdownMenu>
                  
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50 text-slate-500">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-44 bg-white border-slate-100 rounded-xl p-1 shadow-xl">
                        <DropdownMenuItem className="gap-2 rounded-lg text-slate-700 font-medium py-2 px-2.5 cursor-pointer text-xs">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>الملف الطبي</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-lg text-slate-700 font-medium py-2 px-2.5 cursor-pointer text-xs">
                          <Edit3 className="w-4 h-4 text-slate-400" />
                          <span>تعديل البيانات</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 rounded-lg text-rose-600 focus:text-rose-700 focus:bg-rose-50 font-bold py-2 px-2.5 cursor-pointer text-xs">
                          <UserMinus className="w-4 h-4 text-rose-400" />
                          <span>حذف السجل</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}