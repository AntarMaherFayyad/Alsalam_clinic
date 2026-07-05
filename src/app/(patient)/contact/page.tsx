'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Info, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useSettings } from '@/components/hooks/useSettings'
import { cn } from '@/lib/utils'
import { useSendMessage } from '@/components/hooks/useMessages'

export default function ContactPage() {
    const { data: settings } = useSettings()
    const { mutateAsync: sendMessage } = useSendMessage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            await sendMessage({
                full_name: form.name,
                phone: form.phone,
                email: form.email || null,
                subject: form.subject,
                message: form.message,
            })

            setSubmitted(true)
        } catch (err: any) {
            console.error('Error sending message:', err.message || err);
            setError(err.message || 'حدث خطأ أثناء إرسال رسالتك، برجاء المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false)
        }
    }
    const contactItems = [
        {
            icon: Phone,
            title: 'قناة الهاتف المباشر',
            value: settings?.phone ?? '',
            href: `tel:${settings?.phone}`,
            color: 'bg-[#0b6a6b]/10 text-[#0b6a6b]',
            isLtr: true,
            label: 'اتصل بنا'
        },
        {
            icon: MessageCircle,
            title: 'المحادثة الفورية',
            value: 'تواصل عبر واتساب',
            href: `https://wa.me/${settings?.whatsapp}`,
            color: 'bg-emerald-50 text-emerald-600',
            isLtr: false,
            label: 'ابدأ الدردشة'
        },
        {
            icon: Mail,
            title: 'البريد الإلكتروني',
            value: settings?.email ?? '',
            href: `mailto:${settings?.email}`,
            color: 'bg-sky-50 text-sky-600',
            isLtr: true,
            label: 'أرسل بريداً'
        },
        {
            icon: MapPin,
            title: 'موقع العيادة',
            value: settings?.address ?? '',
            href: '#map',
            color: 'bg-amber-50 text-amber-600',
            isLtr: false,
            label: 'عرض الموقع'
        },
    ]

    return (
        <main dir="rtl" className="bg-slate-50/30 min-h-screen text-right">
            <div className="bg-gradient-to-br from-[#0b6a6b] to-[#084f50] pt-36 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">تواصل معنا</h1>
                    <p className="text-white/85 max-w-xl mx-auto font-light text-sm sm:text-base leading-relaxed">
                        نحن هنا دائماً للإجابة على استفساراتك الطبية والتنظيمية ومساعدتك في الحصول على رعاية متكاملة تحت إشراف د. أحمد محمد السالم.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* كروت قنوات الاتصال الأربعة المطورة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactItems.map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100/70 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col items-center text-center h-full"
                        >
                            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110', item.color)}>
                                <item.icon className="w-5 h-5 stroke-[2.2]" />
                            </div>
                            <p className="font-bold text-slate-800 text-sm mb-1">{item.title}</p>
                            <p className="text-slate-500 text-xs leading-relaxed font-normal mb-4 flex-1 max-w-[200px] truncate" dir={item.isLtr ? 'ltr' : 'rtl'}>
                                {item.value}
                            </p>
                            <span className="text-[11px] font-bold text-[#0b6a6b] bg-[#0b6a6b]/5 px-3 py-1 rounded-lg group-hover:bg-[#0b6a6b] group-hover:text-white transition-colors duration-300">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100/50">
                        <h2 className="text-xl font-extrabold text-slate-800 mb-2">أرسل رسالة فورية</h2>
                        <p className="text-xs text-slate-400 mb-6 font-light">املأ الحقول التالية وسيقوم قسم المتابعة بالرد عليك عبر البريد أو الهاتف فوراً.</p>
                        {error && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs font-medium text-center mb-4">
                                {error}
                            </div>
                        )}

                        {submitted ? (
                            <div className="text-center py-14 flex flex-col items-center">
                                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-sm">
                                    <CheckCircle className="w-8 h-8 text-emerald-500 stroke-[2.5]" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-800 mb-2">تم إرسال رسالتك بنجاح!</h3>
                                <p className="text-slate-500 mb-6 font-light text-sm max-w-sm">نشكرك على تواصلك معنا، سيقوم مسؤول المتابعة الطبية بالرد عليك في أقرب وقت ممكن.</p>
                                <Button
                                    variant="outline"
                                    className="border-slate-200 text-slate-700 bg-white hover:bg-[#0b6a6b] hover:text-white rounded-xl font-bold text-xs px-5 h-10 transition-all duration-300"
                                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }) }}
                                >
                                    إرسال رسالة أخرى
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-bold text-slate-700">الاسم الكامل</Label>
                                        <Input
                                            id="name"
                                            placeholder="أدخل اسمك الكريم"
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-xs font-bold text-slate-700">رقم الهاتف</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="01XXXXXXXX"
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-bold text-slate-700">البريد الإلكتروني (اختياري)</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@email.com"
                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-xs font-bold text-slate-700">الموضوع</Label>
                                    <Input
                                        id="subject"
                                        placeholder="ما هو عنوان استفسارك؟"
                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-xs font-bold text-slate-700">نص الرسالة</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="اكتب تفاصيل رسالتك أو استفسارك الطبي هنا..."
                                        rows={4}
                                        className="rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all resize-none p-4 text-right"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full gap-2 h-12 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold shadow-md shadow-[#0b6a6b]/10 transition-all duration-300 text-sm flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>إرسال رسالتك الآن</span>
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* سكشن الخريطة التفاعلية */}
                    <div className="space-y-6 h-full flex flex-col text-right">
                        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xl shadow-slate-100/50 flex-1 flex flex-col">
                            <h2 className="text-lg font-bold text-slate-800 px-2 pt-2 pb-4 border-b border-slate-50">موقعنا على الخريطة</h2>

                            <div id="map" className="relative bg-slate-100 rounded-2xl overflow-hidden min-h-[300px] flex-1 flex items-center justify-center border border-slate-100 mt-4">
                                <div className="text-center p-6 relative z-10">
                                    <MapPin className="w-10 h-10 mx-auto mb-3 text-[#0b6a6b]/40 animate-pulse" />
                                    <p className="font-bold text-slate-800 text-sm">موقع العيادة المعتمد</p>
                                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">{settings?.address ?? ''}</p>
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 mt-5 bg-[#0b6a6b] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:bg-[#095455] transition-all duration-300 flex-row-reverse"
                                    >
                                        <span>فتح عبر Google Maps</span>
                                    </a>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-transparent to-slate-50/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* كارت معلومات إضافية */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-100/50 space-y-4">
                            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 pb-2 border-b border-slate-50 flex-row-reverse">
                                <Info className="w-4 h-4 text-[#0b6a6b]" />
                                <span>تفاصيل التوجيه المباشر</span>
                            </h3>

                            <div className="flex items-start gap-3.5 flex-row-reverse">
                                <div className="w-8 h-8 rounded-lg bg-[#0b6a6b]/5 flex items-center justify-center border border-[#0b6a6b]/5 shrink-0 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-[#0b6a6b]" />
                                </div>
                                <div>
                                    <p className="font-bold text-xs text-slate-700 mb-0.5">العنوان بالتفصيل</p>
                                    <p className="text-slate-500 text-xs font-light leading-relaxed">{settings?.address ?? ''}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 pt-2 flex-row-reverse">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-xs text-slate-700 mb-0.5">خط المساعدة والحجز الهاتفي</p>
                                    <a href={`tel:${settings?.phone}`} className="text-[#0b6a6b] text-xs font-bold font-mono tracking-wider hover:underline" dir="ltr">
                                       {settings?.phone ?? ''}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}