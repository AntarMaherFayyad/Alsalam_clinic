import Link from 'next/link'
import { Phone, MessageCircle, Mail, MapPin, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteSettings } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ContactCtaSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* البانر الرئيسي المتدرج (CTA Banner) */}
                <div className="hero-gradient rounded-3xl p-8 sm:p-14 text-center mb-16 relative overflow-hidden shadow-xl shadow-[#0b6a6b]/10">
                    {/* لمسات الدوائر الهندسية الجمالية في الخلفية */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full border-2 border-white -translate-y-1/2 translate-x-1/2 blur-[1px]" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full border-2 border-white translate-y-1/2 -translate-x-1/2 blur-[1px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-balance mb-4 tracking-tight">
                            هل تحتاج إلى استشارة طبية عاجلة؟
                        </h2>
                        <p className="text-white/90 max-w-xl mx-auto mb-8 leading-relaxed font-light text-sm sm:text-base">
                            فريقنا الطبي مستعد للإجابة على كافة استفساراتكم وتوجيهكم للرعاية الأنسب. تواصل معنا الآن وسيسعدنا مساعدتك في الحصول على رعاية تليق بصحتك.
                        </p>

                        {/* أزرار البانر التفاعلية */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                            <Link href="/booking" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="bg-white text-[#0b6a6b] hover:bg-slate-50 font-bold w-full h-12 rounded-xl transition-all duration-300 shadow-md gap-2 group/btn"
                                >
                                    <span>احجز موعدك الآن</span>
                                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                                </Button>
                            </Link>

                            <a
                                href={`https://wa.me/${siteSettings.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/40 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm w-full h-12 rounded-xl font-bold transition-all duration-300 gap-2"
                                >
                                    <MessageCircle className="w-4 h-4 fill-white/10" />
                                    <span>تواصل عبر واتساب</span>
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* كروت قنوات الاتصال الأربعة (Contact Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Phone,
                            title: 'قناة الهاتف المباشر',
                            value: siteSettings.phone,
                            href: `tel:${siteSettings.phone}`,
                            color: 'bg-[#0b6a6b]/10 text-[#0b6a6b]',
                            label: 'اتصل بنا الآن',
                        },
                        {
                            icon: MessageCircle,
                            title: 'المحادثة الفورية',
                            value: 'تواصل واتساب',
                            href: `https://wa.me/${siteSettings.whatsapp}`,
                            color: 'bg-emerald-50 text-emerald-600',
                            label: 'ابدأ الدردشة',
                        },
                        {
                            icon: Mail,
                            title: 'البريد الإلكتروني',
                            value: siteSettings.email,
                            href: `mailto:${siteSettings.email}`,
                            color: 'bg-sky-50 text-sky-600',
                            label: 'أرسل رسالة',
                        },
                        {
                            icon: MapPin,
                            title: 'موقع العيادة الطبية',
                            value: siteSettings.address,
                            href: '/contact',
                            color: 'bg-amber-50 text-amber-600',
                            label: 'عرض على الخريطة',
                        },
                    ].map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col items-center text-center h-full"
                        >
                            {/* حاوية الأيقونة */}
                            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110', item.color)}>
                                <item.icon className="w-5 h-5 stroke-[2.2]" />
                            </div>

                            {/* النصوص والتفاصيل */}
                            <p className="font-bold text-slate-800 text-sm mb-1">{item.title}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-normal mb-4 flex-1 max-w-[200px] truncate-2-lines" dir={item.icon === Phone ? 'ltr' : 'rtl'}>
                                {item.value}
                            </p>

                            {/* رابط تفاعلي صغير أسفل كل كارت */}
                            <span className="text-[11px] font-bold text-[#0b6a6b] bg-[#0b6a6b]/5 px-3 py-1 rounded-lg group-hover:bg-[#0b6a6b] group-hover:text-white transition-colors duration-300">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}