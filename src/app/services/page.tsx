import Image from 'next/image'
import Link from 'next/link'
import { Stethoscope, HeartPulse, MessageSquare, FlaskConical, Syringe, Bandage, ArrowLeft, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
    Stethoscope, HeartPulse, MessageSquare, FlaskConical, Syringe, Bandage,
}

export default function ServicesPage() {
    const visible = services.filter((s) => s.visible)
    return (
        <>
            <main>
                {/* Page Header */}
                <div className="hero-gradient pt-28 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">خدماتنا الطبية</h1>
                        <p className="text-white/85 max-w-xl mx-auto">نقدم مجموعة شاملة من الخدمات الطبية المتخصصة بأعلى معايير الجودة</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visible.map((service, i) => {
                            const Icon = iconMap[service.icon] || Stethoscope
                            const colors = ['bg-primary/10 text-primary', 'bg-emerald-100 text-emerald-600', 'bg-blue-100 text-blue-600', 'bg-amber-100 text-amber-600', 'bg-rose-100 text-rose-600', 'bg-cyan-100 text-cyan-600']
                            return (
                                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                                        <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center ${colors[i % colors.length]}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                                        {service.price !== undefined && (
                                            <p className="text-primary font-bold text-lg mb-4">{service.price} ريال</p>
                                        )}
                                        <div className="flex gap-3">
                                            <Link href={`/services/${service.id}`} className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full gap-2 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                                                    التفاصيل
                                                    <ArrowLeft className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Link href="/booking">
                                                <Button size="sm" className="gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    احجز
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
