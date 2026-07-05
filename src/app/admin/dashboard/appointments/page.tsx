// import { appointments, services } from '@/lib/data'
// import { Calendar, Phone, Mail, Clock, Check, CheckCircle2, XCircle, Filter } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'

// const statusConfig = {
//   pending: { label: 'معلق', className: 'bg-amber-50 text-amber-700 border-amber-200/60 font-bold' },
//   confirmed: { label: 'مؤكد', className: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 font-bold' },
//   cancelled: { label: 'ملغي', className: 'bg-rose-50 text-rose-700 border-rose-200/60 font-bold' },
//   completed: { label: 'مكتمل', className: 'bg-sky-50 text-sky-700 border-sky-200/60 font-bold' },
// }

// export default function AppointmentsPage() {
//   const total = appointments.length
//   const pending = appointments.filter((a) => a.status === 'pending').length
//   const confirmed = appointments.filter((a) => a.status === 'confirmed').length
//   const completed = appointments.filter((a) => a.status === 'completed').length

//   return (
//     <div className="space-y-6">
//       {/* الهيدر العلوي */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">جدول المواعيد</h1>
//         <p className="text-slate-500 text-xs sm:text-sm font-light">متابعة وإدارة طلبات الحجز الطبية وتأكيد أوقات الزيارة</p>
//       </div>

//       {/* كروت ملخص الإحصائيات الفخمة */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
//         {[
//           { label: 'إجمالي المواعيد', value: total, color: 'text-slate-800', bg: 'bg-slate-100/50' },
//           { label: 'طلبات معلقة', value: pending, color: 'text-amber-600', bg: 'bg-amber-50' },
//           { label: 'مواعيد مؤكدة', value: confirmed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
//           { label: 'زيارات مكتملة', value: completed, color: 'text-sky-600', bg: 'bg-sky-50' },
//         ].map((item) => (
//           <Card key={item.label} className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
//             <CardContent className="p-5 sm:p-6 flex items-center justify-between">
//               <div className="space-y-1">
//                 <p className="text-slate-400 text-[11px] font-bold tracking-wide">{item.label}</p>
//                 <p className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${item.color}`}>{item.value}</p>
//               </div>
//               <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0 border border-transparent`} />
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* قائمة المواعيد الرئيسية */}
//       <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
//         <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
//             <Calendar className="w-4 h-4 text-[#0b6a6b]" />
//             <span>طلبات الحجز الواردة</span>
//           </CardTitle>
          
//           {/* واجهة أزرار فلترة سريعة للـ UI فقط */}
//           <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
//             <Button variant="secondary" size="sm" className="h-8 text-xs font-bold bg-[#0b6a6b]/10 text-[#0b6a6b] rounded-lg">الكل</Button>
//             <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold text-slate-500 rounded-lg hover:bg-slate-100">المعلقة</Button>
//             <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold text-slate-500 rounded-lg hover:bg-slate-100">المؤكدة</Button>
//           </div>
//         </CardHeader>
        
//         <CardContent className="p-6">
//           <div className="space-y-4">
//             {appointments.map((apt) => {
//               const service = services.find((s) => s.id === apt.serviceId)
//               const status = statusConfig[apt.status] || statusConfig.pending
//               const isPending = apt.status === 'pending'
//               const isConfirmed = apt.status === 'confirmed'
              
//               return (
//                 <div
//                   key={apt.id}
//                   className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-slate-50/60 rounded-2xl border border-slate-100/70 hover:border-[#0b6a6b]/20 hover:shadow-sm hover:bg-white transition-all duration-300"
//                 >
//                   <div className="flex items-start gap-4 min-w-0 flex-1">
//                     {/* أفاتار المريض المسجل */}
//                     <div className="w-11 h-11 rounded-xl bg-[#0b6a6b]/10 border border-[#0b6a6b]/10 flex items-center justify-center shrink-0 text-[#0b6a6b] font-black text-sm">
//                       {apt.patientName.charAt(0)}
//                     </div>
                    
//                     {/* تفاصيل المريض والخدمة المطلوبة */}
//                     <div className="min-w-0 space-y-1 flex-1">
//                       <div className="flex items-center gap-2.5 flex-wrap">
//                         <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{apt.patientName}</p>
//                         <Badge variant="outline" className={`text-[10px] px-2 py-0 rounded-md border shrink-0 ${status.className}`}>
//                           {status.label}
//                         </Badge>
//                       </div>
                      
//                       {service && (
//                         <p className="text-[#0b6a6b] text-xs font-bold">{service.title}</p>
//                       )}
//                       <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed max-w-xl">{apt.reason}</p>
                      
//                       {/* قنوات التواصل المباشرة مع المريض */}
//                       <div className="flex items-center gap-4 mt-2 flex-wrap pt-1">
//                         <a href={`tel:${apt.phone}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-[#0b6a6b] transition-colors">
//                           <Phone className="w-3.5 h-3.5" />
//                           <span dir="ltr">{apt.phone}</span>
//                         </a>
//                         {apt.email && (
//                           <a href={`mailto:${apt.email}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-[#0b6a6b] transition-colors min-w-0">
//                             <Mail className="w-3.5 h-3.5 shrink-0" />
//                             <span className="truncate">{apt.email}</span>
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* التوقيت وأزرار اتخاذ القرار الجانبية */}
//                   <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                    
//                     {/* شارات الوقت والتاريخ الزجاجية */}
//                     <div className="flex items-center gap-2 font-mono">
//                       <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-xl px-2.5 py-1 shadow-sm text-[11px] font-bold text-slate-600">
//                         <Calendar className="w-3.5 h-3.5 text-[#0b6a6b]" />
//                         <span>{apt.date}</span>
//                       </div>
//                       <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-xl px-2.5 py-1 shadow-sm text-[11px] font-bold text-slate-600">
//                         <Clock className="w-3.5 h-3.5 text-[#0b6a6b]" />
//                         <span dir="ltr">{apt.time}</span>
//                       </div>
//                     </div>

//                     {/* شريط الأزرار الصامتة لإدارة الحجز - الـ Logic متروك لك تماماً لاحقاً */}
//                     <div className="flex items-center gap-1.5">
                      
//                       {/* زر قبول وتأكيد الحجز المعلق */}
//                       {isPending && (
//                         <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200" title="تأكيد الحجز">
//                           <Check className="w-3.5 h-3.5" />
//                         </Button>
//                       )}

//                       {/* زر تحويل الحجز لمكتمل بعد زيارة الطبيب */}
//                       {isConfirmed && (
//                         <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-sky-600 hover:bg-sky-50 hover:border-sky-200" title="اكتملت الزيارة">
//                           <CheckCircle2 className="w-3.5 h-3.5" />
//                         </Button>
//                       )}

//                       {/* زر إلغاء الحجز الخطر */}
//                       {apt.status !== 'cancelled' && apt.status !== 'completed' && (
//                         <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600" title="إلغاء الموعد">
//                           <XCircle className="w-3.5 h-3.5" />
//                         </Button>
//                       )}
//                     </div>

//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client"

import { useAppointments, useUpdateAppointmentStatus, useDeleteAppointment } from '@/components/hooks/useAppointments'
import { Calendar, Clock, Check, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail } from 'lucide-react'

const statusConfig = {
  pending: { label: 'معلق', className: 'bg-amber-50 text-amber-700 border-amber-200/60 font-bold' },
  confirmed: { label: 'مؤكد', className: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 font-bold' },
  cancelled: { label: 'ملغي', className: 'bg-rose-50 text-rose-700 border-rose-200/60 font-bold' },
  completed: { label: 'مكتمل', className: 'bg-sky-50 text-sky-700 border-sky-200/60 font-bold' },
}

export default function AppointmentsPage() {
  const { data: appointments = [], isLoading, isError } = useAppointments()
  const { mutate: updateStatus } = useUpdateAppointmentStatus()
  const { mutate: deleteAppointment } = useDeleteAppointment()

  const total = appointments.length
  const pending = appointments.filter(a => a.status === 'pending').length
  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const completed = appointments.filter(a => a.status === 'completed').length

  if (isLoading) return (
    <div className="space-y-6 p-1 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-xl w-1/4" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-2xl" />)}
      </div>
      <div className="h-64 bg-slate-100 rounded-2xl" />
    </div>
  )

  if (isError) return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
      <p className="text-rose-500 font-bold text-sm">حدث خطأ أثناء تحميل المواعيد.</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-xl text-xs">إعادة المحاولة</button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">جدول المواعيد</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light">متابعة وإدارة طلبات الحجز الطبية وتأكيد أوقات الزيارة</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[
          { label: 'إجمالي المواعيد', value: total, color: 'text-slate-800' },
          { label: 'طلبات معلقة', value: pending, color: 'text-amber-600' },
          { label: 'مواعيد مؤكدة', value: confirmed, color: 'text-emerald-600' },
          { label: 'زيارات مكتملة', value: completed, color: 'text-sky-600' },
        ].map((item) => (
          <Card key={item.label} className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl">
            <CardContent className="p-5 sm:p-6">
              <p className="text-slate-400 text-[11px] font-bold tracking-wide">{item.label}</p>
              <p className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${item.color}`}>{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#0b6a6b]" />
            <span>طلبات الحجز الواردة</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {appointments.length === 0 ? (
            <div className="text-center py-16 text-slate-400 border border-dashed border-slate-100 rounded-2xl">
              <p className="text-sm font-medium">لا توجد مواعيد حالياً</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => {
                const status = statusConfig[apt.status] || statusConfig.pending
                const isPending = apt.status === 'pending'
                const isConfirmed = apt.status === 'confirmed'

                return (
                  <div key={apt.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-slate-50/60 rounded-2xl border border-slate-100/70 hover:border-[#0b6a6b]/20 hover:shadow-sm hover:bg-white transition-all duration-300">
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-[#0b6a6b]/10 border border-[#0b6a6b]/10 flex items-center justify-center shrink-0 text-[#0b6a6b] font-black text-sm">
                        {apt.patient_name.charAt(0)}
                      </div>

                      <div className="min-w-0 space-y-1 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <p className="font-bold text-slate-800 text-xs sm:text-sm">{apt.patient_name}</p>
                          <Badge variant="outline" className={`text-[10px] px-2 py-0 rounded-md border ${status.className}`}>
                            {status.label}
                          </Badge>
                        </div>
                        {apt.service && <p className="text-[#0b6a6b] text-xs font-bold">{apt.service}</p>}
                        {apt.reason && <p className="text-slate-500 text-xs font-light">{apt.reason}</p>}

                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <a href={`tel:${apt.phone}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-[#0b6a6b]">
                            <Phone className="w-3.5 h-3.5" />
                            <span dir="ltr">{apt.phone}</span>
                          </a>
                          {apt.email && (
                            <a href={`mailto:${apt.email}`} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-[#0b6a6b]">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{apt.email}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                      <div className="flex items-center gap-2 font-mono">
                        <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-xl px-2.5 py-1 shadow-sm text-[11px] font-bold text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-[#0b6a6b]" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-xl px-2.5 py-1 shadow-sm text-[11px] font-bold text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-[#0b6a6b]" />
                          <span dir="ltr">{apt.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isPending && (
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-emerald-600 hover:bg-emerald-50" title="تأكيد الحجز"
                            onClick={() => updateStatus({ id: apt.id, status: 'confirmed' })}>
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {isConfirmed && (
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-sky-600 hover:bg-sky-50" title="اكتملت الزيارة"
                            onClick={() => updateStatus({ id: apt.id, status: 'completed' })}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-rose-500 hover:bg-rose-50" title="إلغاء الموعد"
                            onClick={() => updateStatus({ id: apt.id, status: 'cancelled' })}>
                            <XCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-200 text-slate-400 hover:bg-slate-50" title="حذف"
                          onClick={() => deleteAppointment(apt.id)}>
                          <XCircle className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}