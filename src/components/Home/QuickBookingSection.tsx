'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { services, timeSlots } from '@/lib/data'

export function QuickBookingSection() {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
        reason: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section id="quick-booking" className="py-24 bg-slate-50/50 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0b6a6b]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-14 flex flex-col items-center">
                    <span className="inline-flex bg-[#0b6a6b]/10 text-[#0b6a6b] px-4 py-1.5 rounded-xl text-xs font-bold mb-4 tracking-wide">
                        حجز سريع
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        احجز موعد استشارتك الطبية بسهولة
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-light">
                        املأ النموذج أدناه ببياناتك الصحيحة وسيقوم قسم التنسيق الطبي بالاتصال بك لتأكيد الموعد وضمان راحتك.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-6 sm:p-10 transition-all duration-300">
                    {submitted ? (
                        <div className="text-center py-10 flex flex-col items-center">
                            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm animate-bounce">
                                <CheckCircle className="w-10 h-10 text-emerald-500 stroke-[2.2]" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-slate-800 mb-3">تم استلام طلبك بنجاح!</h3>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm sm:text-base font-light leading-relaxed">
                                شكراً لثقتك بنا. سنتواصل معك هاتفياً على الرقم المسجل في أقرب وقت ممكن لتأكيد الساعة والترتيبات الخاصة بزيارتك.
                            </p>
                            <Button
                                onClick={() => setSubmitted(false)}
                                variant="outline"
                                className="border-slate-200 text-slate-700 bg-white hover:bg-[#0b6a6b] hover:text-white hover:border-[#0b6a6b] rounded-xl font-bold px-6 h-11 text-sm shadow-sm transition-all duration-300"
                            >
                                حجز موعد آخر مراجع
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                        <User className="w-4 h-4 text-[#0b6a6b]" />
                                        الاسم الكامل للمريض
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="أدخل اسمك الثلاثي"
                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                        <Phone className="w-4 h-4 text-[#0b6a6b]" />
                                        رقم الهاتف الجوال
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="05XXXXXXXX"
                                        dir="ltr"
                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200 text-right"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                    <Mail className="w-4 h-4 text-[#0b6a6b]" />
                                    البريد الإلكتروني (اختياري)
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200 text-right"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-700 mb-1 block">الخدمة العيادية المطلوبة</Label>
                                <Select value={form.service} onValueChange={(v: string | null) => setForm({ ...form, service: v || '' })} required>
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200">
                                        <SelectValue placeholder="اختر نوع الخدمة أو الكشف الطبي" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                        {services.filter(s => s.visible).map(s => (
                                            <SelectItem key={s.id} value={s.id} className="rounded-lg text-slate-700 focus:bg-[#0b6a6b]/5 focus:text-[#0b6a6b] text-sm py-2.5">
                                                {s.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                        <Calendar className="w-4 h-4 text-[#0b6a6b]" />
                                        تاريخ الحجز المفضل
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        dir="ltr"
                                        min={new Date().toISOString().split('T')[0]}
                                        className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200 text-right"
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                        <Clock className="w-4 h-4 text-[#0b6a6b]" />
                                        الوقت المفضل للزيارة
                                    </Label>
                                    <Select value={form.time} onValueChange={(v: string | null) => setForm({ ...form, time: v || '' })} required>
                                        <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200">
                                            <SelectValue placeholder="اختر الفترة الزمنية" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                            {timeSlots.map(t => (
                                                <SelectItem key={t} value={t} className="rounded-lg text-slate-700 focus:bg-[#0b6a6b]/5 focus:text-[#0b6a6b] text-sm py-2.5">
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                    <MessageSquare className="w-4 h-4 text-[#0b6a6b]" />
                                    الأعراض أو سبب الزيارة بإيجاز
                                </Label>
                                <Textarea
                                    id="reason"
                                    placeholder="يرجى ذكر أي تفاصيل أو أعراض تساعد الطبيب على تشخيصك بدقة (مثال: استشارة باطنة، مراجعة دورية)"
                                    rows={4}
                                    className="rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all duration-200 resize-none p-4.5"
                                    value={form.reason}
                                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full gap-2 h-12 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold shadow-md shadow-[#0b6a6b]/10 transition-all duration-300 text-sm mt-2"
                            >
                                <Calendar className="w-4 h-4 shrink-0" />
                                <span>تأكيد طلب حجز الموعد</span>
                            </Button>
                        </form>
                    )}
                </div>

            </div>
        </section>
    )
}