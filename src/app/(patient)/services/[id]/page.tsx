import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ChevronLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GetServices } from '@/lib/admin/services'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params
  const data = await GetServices()
  const service = data.find((s) => s.id === id)

  if (!service) notFound()

  const related = data.filter((s) => s.id !== id && s.visible).slice(0, 3)

  return (
    <>
      <main dir="rtl" className="text-right">
        <div className="bg-gradient-to-br from-[#0b6a6b] to-[#084f50] pt-36 pb-14 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <nav className="flex items-center gap-1.5 text-white/75 text-xs sm:text-sm mb-5 flex-wrap font-light">
              <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
              <ChevronLeft className="w-3.5 h-3.5 opacity-65" />
              <Link href="/services" className="hover:text-white transition-colors">الخدمات</Link>
              <ChevronLeft className="w-3.5 h-3.5 opacity-65" />
              <span className="text-white font-medium max-w-[200px] sm:max-w-none truncate">{service.title}</span>
            </nav>

            <span className="bg-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl mb-4 inline-block backdrop-blur-sm">
              أمراض الباطنة والأمراض المزمنة
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white text-balance leading-tight mb-4 tracking-tight">
              {service.title}
            </h1>

            {service.price !== undefined && service.price !== null && (
              <div className="flex items-center gap-2 text-emerald-100 text-sm font-semibold bg-white/5 w-fit px-3 py-1.5 rounded-xl border border-white/5">
                <span className="text-white/80 font-normal">تكلفة الكشف:</span>
                <span className="text-white text-lg font-extrabold">{service.price}</span>
                <span className="text-xs opacity-90">ج.م</span>
              </div>
            )}

          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2">

              <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-md border border-slate-100 bg-slate-50">
                <Image
                  src={service.image_url || "/images/clinic.png"}
                  alt={service.title || "تفاصيل الخدمة"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-4">عن هذه الخدمة</h2>
              <p className="text-slate-600 leading-relaxed mb-8 font-normal">{service.description}</p>

              <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-4 text-base">ماذا يشمل هذا الكشف؟</h3>
                <ul className="space-y-3.5">
                  {['فحص سريري شامل بدقة', 'مراجعة التاريخ المرضي والأدوية المزمنة', 'صياغة خطة علاجية وغذائية مخصصة', 'متابعة دورية وتقييم مستمر بعد الكشف'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-slate-600 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">احجز هذه الخدمة</h3>
                {service.price !== undefined && service.price !== null && (
                  <div className="flex items-center justify-between bg-[#0b6a6b]/5 rounded-xl p-4 mb-4">
                    <span className="text-slate-500 text-sm font-medium">تكلفة الخدمة</span>
                    <span className="text-[#0b6a6b] font-extrabold text-xl">{service.price} ج.م</span>
                  </div>
                )}
                <Link href={`/booking?service=${service.id}`}>
                  <Button className="w-full gap-2 mb-3 bg-[#0b6a6b] hover:bg-[#084f50] text-white rounded-xl h-12 font-bold transition-all">
                    <Calendar className="w-5 h-5" />
                    احجز موعد الآن
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full border-slate-200 text-slate-600 rounded-xl h-12 font-semibold hover:bg-slate-50 transition-all">
                    استفسر عن الخدمة
                  </Button>
                </Link>
              </div>

              {related.length > 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4">خدمات طبية أخرى</h3>
                  <div className="space-y-3">
                    {related.map((s) => (
                      <Link key={s.id} href={`/services/${s.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                        <div className="w-10 h-10 rounded-lg bg-[#0b6a6b]/10 flex items-center justify-center shrink-0">
                          <span className="text-[#0b6a6b] text-xs font-bold">{s.title.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-700 text-sm truncate text-right">{s.title}</p>
                          {s.price !== undefined && s.price !== null && (
                            <p className="text-[#0b6a6b] text-xs font-semibold text-right mt-0.5">{s.price} ج.م</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  )
}