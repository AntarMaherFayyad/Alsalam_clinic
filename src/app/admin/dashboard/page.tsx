import { GetAppointments } from '@/lib/admin/appointments'
import { GetMessages } from '@/lib/admin/messages'
import { GetArticles } from '@/lib/admin/articles'
import { GetServices } from '@/lib/admin/services'
import { Calendar, MessageSquare, FileText, Stethoscope, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const statusColors = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  completed: 'bg-sky-50 text-sky-700 border-sky-200',
}

const statusLabels = {
  pending: 'معلق',
  confirmed: 'مؤكد',
  cancelled: 'ملغي',
  completed: 'مكتمل',
}

export default async function AdminDashboardPage() {
  const [appointments, messages, articles, services] = await Promise.all([
    GetAppointments(),
    GetMessages(),
    GetArticles(),
    GetServices(),
  ])

  const pendingCount = appointments.filter(a => a.status === 'pending').length
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length
  const unreadMessages = messages.filter(m => !m.is_read).length
  const publishedArticles = articles.filter(a => a.is_published).length
  const activeServices = services.filter(s => s.visible).length

  const stats = [
    { label: 'إجمالي المواعيد', value: appointments.length, icon: Calendar, color: 'text-[#0b6a6b]', bg: 'bg-[#0b6a6b]/10' },
    { label: 'مواعيد معلقة', value: pendingCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'مواعيد مؤكدة', value: confirmedCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'رسائل غير مقروءة', value: unreadMessages, icon: MessageSquare, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'مقالات منشورة', value: publishedArticles, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'خدمات نشطة', value: activeServices, icon: Stethoscope, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">إحصائيات العيادة</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light">نظرة عامة على نشاط العمل والطلبات الحالية</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-400 tracking-wide">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 font-mono tracking-tight">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0 border border-slate-100`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#0b6a6b]" />
              <span>أحدث طلبات المواعيد</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3.5">
              {appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3.5 bg-slate-50/60 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#0b6a6b]/10 border border-[#0b6a6b]/10 flex items-center justify-center shrink-0 text-[#0b6a6b] font-bold text-sm">
                      {apt.patient_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-700 text-xs sm:text-sm truncate">{apt.patient_name}</p>
                      <p className="text-slate-500 text-[11px] truncate mt-0.5 font-light">{apt.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-left hidden sm:block font-mono">
                      <p className="text-xs font-semibold text-slate-600">{apt.date}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{apt.time}</p>
                    </div>
                    <Badge variant="outline" className={`text-[11px] font-medium px-2.5 py-0.5 rounded-lg border ${statusColors[apt.status]}`}>
                      {statusLabels[apt.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#0b6a6b]" />
              <span>أحدث رسائل تواصل معنا</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3.5">
              {messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="flex items-start justify-between p-3.5 bg-slate-50/60 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-sm border border-indigo-100">
                      {msg.full_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-700 text-xs sm:text-sm truncate">{msg.full_name}</p>
                      <p className="text-indigo-600 font-semibold text-[11px] mt-0.5 truncate">{msg.subject}</p>
                      <p className="text-slate-500 font-light text-[11px] mt-1 line-clamp-1">{msg.message}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] font-bold px-2 rounded-md shrink-0 border ${
                    !msg.is_read
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                      : 'border-slate-200 bg-slate-100 text-slate-500'
                  }`}>
                    {!msg.is_read ? 'جديد' : 'مقروء'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}