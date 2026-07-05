import Image from 'next/image'
import Link from 'next/link'
import { Stethoscope, HeartPulse, MessageSquare, FlaskConical, Syringe, Bandage, ArrowLeft, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GetServices } from '@/lib/admin/services'

const iconMap: Record<string, React.ElementType> = {
    Stethoscope,
    HeartPulse,
    MessageSquare,
    FlaskConical,
    Syringe,
    Bandage,
}

export default async function ServicesPage() {
    const data = await GetServices()
    const activeServices = data.filter((s) => s.visible)

    return (
        <>
            <main dir="rtl" className="text-right">

                <section className="hero-gradient pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance mb-4">
                            خدماتنا الطبية
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                            نقدم مجموعة شاملة من الخدمات الطبية المتخصصة بأعلى معايير الجودة والرعاية الوقائية المتكاملة لسلامتك.

                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeServices.map((service, i) => {
                            const Icon = iconMap[service.icon || ''] || Stethoscope

                            const colors = [
                                'bg-[#0b6a6b]/10 text-[#0b6a6b]',
                                'bg-emerald-100 text-emerald-600',
                                'bg-blue-100 text-blue-600',
                                'bg-amber-100 text-amber-600',
                                'bg-rose-100 text-rose-600',
                                'bg-cyan-100 text-cyan-600'
                            ]
                            const colorClass = colors[i % colors.length]

                            return (
                                <Card key={service.id} className="group hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden border border-slate-100 bg-white flex flex-col">
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 border-b border-slate-50">
                                        <Image
                                            src={service.image_url || "/images/clinic.png"} // صورة حماية بديلة
                                            alt={service.title || "خدمة طبية"}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-w-7xl) 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />

                                        <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${colorClass}`}>
                                            <Icon className="w-5 h-5 stroke-[2.2]" />
                                        </div>
                                    </div>

                                    <CardContent className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-slate-850 mb-2 group-hover:text-[#0b6a6b] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                                            {service.description}
                                        </p>

                                        {service.price !== undefined && service.price !== null && (
                                            <p className="text-[#0b6a6b] font-extrabold text-lg mb-4">
                                                {service.price} <span className="text-xs font-normal opacity-80">ج.م</span>
                                            </p>
                                        )}

                                        <div className="flex gap-3 mt-auto pt-2">
                                            <Link href={`/services/${service.id}`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full gap-2 text-[#0b6a6b] border-[#0b6a6b]/30 hover:bg-[#0b6a6b] hover:text-white rounded-xl font-bold transition-all flex-row-reverse h-10">
                                                    <span>التفاصيل</span>
                                                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                                                </Button>
                                            </Link>

                                            <Link href={`/booking?service=${service.id}`}>
                                                <Button size="sm" className="gap-2 bg-[#0b6a6b] hover:bg-[#084f50] text-white rounded-xl font-bold h-10">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>احجز</span>
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}