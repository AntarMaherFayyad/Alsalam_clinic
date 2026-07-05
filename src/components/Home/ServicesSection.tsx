import Link from 'next/link'
import { Stethoscope, HeartPulse, MessageSquare, FlaskConical, Syringe, Bandage, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GetServices } from '@/lib/admin/services'

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  HeartPulse,
  MessageSquare,
  FlaskConical,
  Syringe,
  Bandage,
}

export async function ServicesSection() {
  const data = await GetServices()

  const visibleServices = data.filter((s) => s.visible).slice(0, 6)

  return (
    <section id="services" className="py-24 bg-slate-50/60 relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0b6a6b]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-flex bg-[#0b6a6b]/10 text-[#0b6a6b] px-4 py-1.5 rounded-xl text-xs font-bold mb-4 tracking-wide uppercase">
            خدماتنا الطبية
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-balance mb-4 tracking-tight">
            رعاية طبية متكاملة لسلامتك
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-light">
            نقدم باقة شاملة من الخدمات الطبية المتخصصة والمجهزة بأحدث التقنيات لضمان أدق النتائج وأفضل سبل الراحة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleServices.map((service, i) => {
            const Icon = iconMap[service.icon || ''] || Stethoscope

            const colors = [
              'bg-[#0b6a6b]/10 text-[#0b6a6b]',
              'bg-emerald-50 text-emerald-600',
              'bg-cyan-50 text-cyan-600',
              'bg-sky-50 text-sky-600',
            ]
            const colorClass = colors[i % colors.length]

            return (
              <Card
                key={service.id}
                className={cn(
                  'group bg-white border border-slate-100 rounded-2xl relative overflow-hidden transition-all duration-300',
                  'hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1.5 hover:border-b-4 hover:border-b-[#0b6a6b]'
                )}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110', colorClass)}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {/* 3. التعديل هنا: استخدام service.title بناءً على عمود الـ title في الجدول */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2.5 group-hover:text-[#0b6a6b] transition-colors duration-200 text-right">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal flex-1 text-right line-clamp-3">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                    {service.price !== undefined && service.price !== null ? (
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-slate-400 font-medium">تكلفة الخدمة</span>
                        <p className="text-[#0b6a6b] font-bold text-base">
                          {service.price} <span className="text-xs font-normal opacity-80">ج.م</span>
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}

                    <Link href={`/services/${service.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0b6a6b] hover:text-[#0b6a6b] hover:bg-[#0b6a6b]/5 gap-1.5 p-0 px-3 h-9 rounded-lg font-semibold text-xs transition-all duration-300 flex-row-reverse"
                      >
                        <span>اعرف المزيد</span>
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-14">
          <Link href="/services">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-200 text-slate-700 bg-white hover:bg-[#0b6a6b] hover:text-white hover:border-[#0b6a6b] rounded-xl font-bold px-8 h-12 text-sm shadow-sm transition-all duration-300 gap-2 group flex-row-reverse"
            >
              <span>عرض جميع الخدمات الطبية</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}