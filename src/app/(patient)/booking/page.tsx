'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ChevronLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateAppointment } from '@/components/hooks/useAppointments'
import { useWorkingHours } from '@/components/hooks/useSettings'
import { useServices } from '@/components/hooks/useServices'
import { cn } from '@/lib/utils'
import { timeSlots } from '@/lib/data'

function BookingForm() {
    const { data: services = [], isLoading: loadingServices } = useServices()
    const { data: workingHoursData = [] } = useWorkingHours()

    const { mutate: createAppointment, isPending } = useCreateAppointment()
    const searchParams = useSearchParams()
    const preService = searchParams.get('service') ?? ''
    const [step, setStep] = useState(1)
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        service: preService || '', // تأكيد أنها لا ترجع null أو undefined
        date: '',
        time: '',
        reason: '',
    })

    useEffect(() => {
        if (preService) setForm((f) => ({ ...f, service: preService }))
    }, [preService])

    const getAvailableDays = () => {
        return workingHoursData.filter(d => d.is_open).map(d => d.day)
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        createAppointment({
            patient_name: form.name,
            phone: form.phone,
            email: form.email || null,
            service: form.service,
            date: form.date,
            time: form.time,
            reason: form.reason || null,
        }, {
            onSuccess: () => {
                setSubmitted(true)
            },
            onError: (err) => {
                console.error('فشل الحجز:', err)
            }
        })
    }

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto text-center py-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm animate-bounce">
                    <CheckCircle className="w-10 h-10 text-emerald-500 stroke-[2.2]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">تم طلب موعدك بنجاح!</h2>
                <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base font-light leading-relaxed mb-6">
                    شكراً لك <span className="font-bold text-slate-800">{form.name}</span>. سنتواصل معك هاتفياً على الرقم <span className="font-mono font-bold text-[#0b6a6b]" dir="ltr">{form.phone}</span> لتأكيد الساعة والترتيبات الخاصة بزيارتك.
                </p>

                {/* ملخص الحجز الفخم */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 w-full text-right mb-8 space-y-3.5 shadow-inner">
                    <h4 className="font-bold text-xs text-slate-400 border-b border-slate-200/60 pb-2 mb-2 uppercase tracking-wide">تفاصيل حجز المراجعة</h4>
                    <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-medium">تاريخ الزيارة:</span><span className="font-bold text-xs text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-100">{form.date}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-medium">الوقت المفضل:</span><span className="font-bold text-xs text-[#0b6a6b] bg-white px-2.5 py-1 rounded-lg border border-slate-100 font-mono" dir="ltr">{form.time}</span></div>
                    <div className="flex justify-between items-center"><span className="text-slate-500 text-xs font-medium">الخدمة الطبية:</span><span className="font-bold text-xs text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-100">{services.find(s => s.id === form.service)?.title ?? 'غير محدد'}</span></div>
                </div>

                <Button
                    onClick={() => { setSubmitted(false); setStep(1); setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', reason: '' }) }}
                    className="bg-[#0b6a6b] text-white hover:bg-[#095455] font-bold h-11 px-6 rounded-xl transition-all shadow-md"
                >
                    حجز موعد آخر مراجع
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Steps - مؤشر خطوات الحجز المتطور والـ RTL الصحيح */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 border shadow-sm",
                            step >= s
                                ? 'bg-[#0b6a6b] text-white border-transparent font-black scale-105'
                                : 'bg-white border-slate-200 text-slate-400'
                        )}>
                            {s}
                        </div>
                        <span className={cn(
                            "text-xs font-bold hidden sm:inline",
                            step >= s ? 'text-slate-800' : 'text-slate-400'
                        )}>
                            {s === 1 ? 'بياناتك الشخصية' : s === 2 ? 'توقيت الموعد' : 'تأكيد الحجز'}
                        </span>
                        {s < 3 && <ChevronLeft className="w-4 h-4 text-slate-300 transition-transform" />}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50 p-6 sm:p-10 transition-all duration-300">

                {/* الخطوة الأولى: البيانات الشخصية */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="border-b border-slate-50 pb-3">
                            <h2 className="text-lg font-extrabold text-slate-800">بياناتك الشخصية</h2>
                            <p className="text-xs text-slate-400 mt-0.5 font-light">يرجى كتابة الاسم ورقم الجوال لتسهيل التواصل الطبي مع العيادة.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                    <User className="w-4 h-4 text-[#0b6a6b]" />
                                    الاسم الكامل للمريض
                                </Label>
                                <Input id="name" placeholder="أدخل اسمك الثلاثي" className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                    <Phone className="w-4 h-4 text-[#0b6a6b]" />
                                    رقم الهاتف الجوال
                                </Label>
                                <Input id="phone" type="tel" placeholder="05XXXXXXXX" dir="ltr" className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                <Mail className="w-4 h-4 text-[#0b6a6b]" />
                                البريد الإلكتروني (اختياري)
                            </Label>
                            <Input id="email" type="email" placeholder="example@email.com" dir="ltr" className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-700 mb-1 block">الخدمة العيادية المطلوبة</Label>
                            <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v || '' })} required
                                disabled={loadingServices}>
                                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all">
                                    <SelectValue placeholder={loadingServices ? 'جاري التحميل...' : 'اختر نوع الخدمة'} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                    {services.filter(s => s.visible).map(s => (
                                        <SelectItem key={s.id} value={s.title}className="rounded-lg text-slate-700 focus:bg-[#0b6a6b]/5 focus:text-[#0b6a6b] text-sm py-2.5">
                                             {s.title}{s.price ? ` - ${s.price} ج.م` : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="button" className="w-full h-11 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold text-sm shadow-md mt-2 transition-all" onClick={() => { if (form.name && form.phone && form.service) setStep(2) }}>
                            الانتقال للخطوة التالية
                        </Button>
                    </div>
                )}

                {/* الخطوة الثانية: تفاصيل وتوقيت الموعد */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="border-b border-slate-50 pb-3">
                            <h2 className="text-lg font-extrabold text-slate-800">اختر توقيت الموعد مناسباً</h2>
                            <p className="text-xs text-slate-400 mt-0.5 font-light">حدد اليوم والفترة المفضلة لزيارة العيادة.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                    <Calendar className="w-4 h-4 text-[#0b6a6b]" />
                                    تاريخ حجز الزيارة
                                </Label>
                                <Input id="date" type="date" dir="ltr" min={new Date().toISOString().split('T')[0]} className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all text-right" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                                    <Clock className="w-4 h-4 text-[#0b6a6b]" />
                                    الفترات الزمنية المتاحة
                                </Label>
                                <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v || '' })} required>
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all">
                                        <SelectValue placeholder="اختر الفترة المقترحة" />
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
                            <Textarea id="reason" placeholder="يرجى ذكر أي تفاصيل طفيفة أو أعراض مساعدة للطبيب الاستشاري..." rows={4} className="rounded-xl border-slate-200 bg-slate-50/50 text-slate-800 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all resize-none p-4" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs font-semibold text-amber-800 flex items-center gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full shrink-0 animate-pulse" />
                            <span>أيام الدوام المعتمدة للعيادة: {getAvailableDays().join('، ')}</span>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button type="button" variant="outline" className="flex-1 h-11 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors" onClick={() => setStep(1)}>السابق</Button>
                            <Button type="button" className="flex-1 h-11 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold text-sm shadow-md transition-colors" onClick={() => { if (form.date && form.time) setStep(3) }}>التالي</Button>
                        </div>
                    </div>
                )}

                {/* الخطوة الثالثة والأخيرة: مراجعة وتأكيد طلب الحجز */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="border-b border-slate-50 pb-3">
                            <h2 className="text-lg font-extrabold text-slate-800">مراجعة وتأكيد الحجز</h2>
                            <p className="text-xs text-slate-400 mt-0.5 font-light">يرجى التأكد من دقة البيانات المدونة قبل التثبيت النهائي.</p>
                        </div>

                        <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6 space-y-3.5 shadow-inner">
                            {[
                                ['اسم المريض المراجع', form.name],
                                ['رقم هاتف الجوال', form.phone],
                                ['البريد الإلكتروني', form.email || 'غير محدد'],
                                ['نوع الكشف الطبي', services.find(s => s.id === form.service)?.title ?? 'غير محدد'],
                                ['تاريخ الزيارة المفضل', form.date],
                                ['توقيت الفترة المقترح', form.time],
                                ['الأعراض المذكورة', form.reason || 'غير محدد'],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between items-start gap-4 border-b border-slate-200/40 pb-2.5 last:border-0 last:pb-0">
                                    <span className="text-slate-400 text-xs font-semibold shrink-0">{label}:</span>
                                    <span className="font-bold text-xs text-slate-800 text-right leading-relaxed">{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-2">
                            <Button type="button" variant="outline" className="flex-1 h-11 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors" onClick={() => setStep(2)}>السابق</Button>
                            <Button type="submit" className="flex-1 h-11 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold text-sm shadow-md gap-2 transition-colors">
                                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        <CheckCircle className="w-4 h-4 shrink-0" />
                                        تأكيد حجز الموعد
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default function BookingPage() {
    return (
        <>
            <main className="bg-slate-50/30 min-h-screen">
                {/* البانر العلوي الفخم */}
                <div className="hero-gradient pt-32 pb-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full border border-white" />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">حجز موعد استشارة</h1>
                        <p className="text-white/90 max-w-xl mx-auto font-light text-sm sm:text-base">
                            احجز موعد كشفك الطبي بخطوات مؤمنة وسريعة لضمان عدم الانتظار بالعيادة.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Suspense fallback={<div className="text-center py-24 text-slate-400 font-medium text-sm animate-pulse">جارٍ تحميل نموذج الحجز الطبي...</div>}>
                        <BookingForm />
                    </Suspense>
                </div>
            </main>
        </>
    )
}