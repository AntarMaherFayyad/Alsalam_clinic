import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MessageCircle, Star, Users, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GetDoctor } from '@/lib/admin/doctor'
import { GetSettings } from '@/lib/admin/settings'

export async  function HeroSection() {
    const doctor = await GetDoctor()
    const settings = await GetSettings()
    return (
        <section className="relative min-h-screen hero-gradient overflow-hidden flex items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-white/30" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-white/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1 text-center lg:text-right">
                        <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-2 text-sm font-medium mb-6">
                            <Star className="w-4 h-4 fill-white" />
                            استشاري أمراض الباطنة والأمراض المزمنة
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight mb-6">
                            {doctor?.name}
                        </h1>

                        <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                            {doctor?.bio?.substring(0, 180)}...
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/booking">
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 font-semibold w-full sm:w-auto shadow-lg">
                                    <Calendar className="w-5 h-5" />
                                    احجز موعدك الآن
                                </Button>
                            </Link>
                            <a
                                href={`https://wa.me/${settings?.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/20 gap-2 w-full sm:w-auto bg-transparent"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    تواصل عبر واتساب
                                </Button>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                            <div className="text-center lg:text-right">
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                                    <Clock className="w-5 h-5 text-white/80" />
                                    <span className="text-3xl font-bold text-white">+{doctor?.experience}</span>
                                </div>
                                <p className="text-white/70 text-sm">سنوات الخبرة</p>
                            </div>
                            <div className="text-center lg:text-right">
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                                    <Users className="w-5 h-5 text-white/80" />
                                    <span className="text-3xl font-bold text-white">+5000</span>
                                </div>
                                <p className="text-white/70 text-sm">مريض</p>
                            </div>
                            <div className="text-center lg:text-right">
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                                    <Award className="w-5 h-5 text-white/80" />
                                    <span className="text-3xl font-bold text-white">+{doctor?.certifications.length}</span>
                                </div>
                                <p className="text-white/70 text-sm">شهادات</p>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Image */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                                <Image
                                    src={doctor?.image || "/images/doctor.png"}
                                    alt={doctor?.name || "صورة الطبيب"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-primary fill-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">تقييم المرضى</p>
                                    <p className="font-bold text-foreground">5.0 / 5.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="oklch(0.98 0.005 180)" />
                </svg>
            </div>
        </section>
    )
}