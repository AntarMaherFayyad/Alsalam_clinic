import Link from 'next/link'
import { Clock, Calendar, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { workingHours } from '@/lib/data'
import { cn } from '@/lib/utils'

export function WorkingHoursSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* لمسة خلفية دائرية خفيفة */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#0b6a6b]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* سكشن المحتوى التعريفي */}
          <div className="flex flex-col items-start">
            <span className="inline-flex bg-[#0b6a6b]/10 text-[#0b6a6b] px-4 py-1.5 rounded-xl text-xs font-bold mb-4 tracking-wide">
              أوقات العمل
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              نستقبلكم طوال أيام الأسبوع
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 font-light text-sm sm:text-base">
              نرحب بكم في عيادتنا طوال أيام الأسبوع لتقديم أفضل رعاية طبية. يرجى مراجعة جدول المواعيد أدناه، وننصح بحجز موعدك مسبقاً إلكترونياً لضمان عدم الانتظار والحصول على الرعاية في الوقت الأنسب لك.
            </p>
            
            <Link href="/booking" className="block w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 h-12 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold shadow-md shadow-[#0b6a6b]/10 transition-all duration-300 group px-6"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>احجز موعدك الآن</span>
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* كارت جدول مواعيد الدوام الاحترافي */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/70 overflow-hidden">
            {/* هيدر الجدول */}
            <div className="bg-[#0b6a6b] px-6 py-4.5 flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-white/10 text-white">
                <Clock className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="font-bold text-white text-base tracking-wide">جدول ساعات العمل المعتمدة</h3>
            </div>
            
            {/* أسطر أيام الأسبوع */}
            <div className="divide-y divide-slate-100">
              {workingHours.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 transition-all duration-200 group/row",
                    item.open ? "hover:bg-slate-50/80" : "bg-slate-50/40"
                  )}
                >
                  {/* اليوم وحالته */}
                  <div className="flex items-center gap-3 transition-transform duration-200 group-hover/row:translate-x-[-2px]">
                    {item.open ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 stroke-[2.5] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 stroke-[2.5] shrink-0" />
                    )}
                    <span className={cn(
                      "font-semibold text-sm",
                      item.open ? "text-slate-700" : "text-slate-400 line-through decoration-slate-300"
                    )}>
                      {item.day}
                    </span>
                  </div>
                  
                  {/* التوقيت */}
                  {item.open ? (
                    <span 
                      className="text-xs font-bold text-[#0b6a6b] bg-[#0b6a6b]/5 px-3 py-1.5 rounded-lg border border-[#0b6a6b]/10 tracking-wide font-mono" 
                      dir="ltr"
                    >
                      {item.from} - {item.to}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                      إجازة عيادة
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}