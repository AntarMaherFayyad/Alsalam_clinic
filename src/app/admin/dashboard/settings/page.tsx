// import { siteSettings, workingHours } from '@/lib/data'
// import { Settings, Phone, Mail, MapPin, Globe, Clock, Share2, Info, Save } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// export default function SettingsAdminPage() {
//   return (
//     <div className="space-y-6">

//       {/* الهيدر العلوي لعنوان الصفحة */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">الإعدادات العامة</h1>
//         <p className="text-slate-500 text-xs sm:text-sm font-light">تحديث إعدادات وبيانات العيادة وروابط التواصل الاجتماعي</p>
//       </div>

//       {/* كرت معلومات العيادة الأساسية */}
//       <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
//         <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
//           <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
//             <Settings className="w-4 h-4 text-[#0b6a6b]" />
//             <span>معلومات العيادة الأساسية</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-6">

//           <div className="grid sm:grid-cols-2 gap-5">
//             <div className="space-y-1.5 text-right">
//               <Label htmlFor="clinicName" className="text-xs font-bold text-slate-700">اسم العيادة</Label>
//               <Input id="clinicName" defaultValue={siteSettings.clinicName} className="bg-white border-slate-200 rounded-xl text-slate-800 font-medium focus-visible:ring-[#0b6a6b]" />
//             </div>
//             <div className="space-y-1.5 text-right">
//               <Label htmlFor="doctorName" className="text-xs font-bold text-slate-700">اسم الطبيب الاستشاري</Label>
//               <Input id="doctorName" defaultValue={siteSettings.doctorName} className="bg-white border-slate-200 rounded-xl text-slate-800 font-medium focus-visible:ring-[#0b6a6b]" />
//             </div>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-5">
//             <div className="space-y-1.5 text-right">
//               <Label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-2">
//                 <Phone className="w-3.5 h-3.5 text-[#0b6a6b]" />
//                 <span>رقم الهاتف المباشر</span>
//               </Label>
//               <Input id="phone" defaultValue={siteSettings.phone} dir="ltr" className="bg-white border-slate-200 rounded-xl text-slate-800 font-mono focus-visible:ring-[#0b6a6b]" />
//             </div>
//             <div className="space-y-1.5 text-right">
//               <Label htmlFor="whatsapp" className="text-xs font-bold text-slate-700 flex items-center gap-2">
//                 <Phone className="w-3.5 h-3.5 text-emerald-600" />
//                 <span>رقم الواتساب</span>
//               </Label>
//               <Input id="whatsapp" defaultValue={siteSettings.whatsapp} dir="ltr" className="bg-white border-slate-200 rounded-xl text-slate-800 font-mono focus-visible:ring-[#0b6a6b]" />
//             </div>
//           </div>

//           <div className="space-y-1.5 text-right">
//             <Label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-2">
//               <Mail className="w-3.5 h-3.5 text-[#0b6a6b]" />
//               <span>البريد الإلكتروني للعيادة</span>
//             </Label>
//             <Input id="email" defaultValue={siteSettings.email} dir="ltr" className="bg-white border-slate-200 rounded-xl text-slate-800 font-medium focus-visible:ring-[#0b6a6b]" />
//           </div>

//           <div className="space-y-1.5 text-right">
//             <Label htmlFor="address" className="text-xs font-bold text-slate-700 flex items-center gap-2">
//               <MapPin className="w-3.5 h-3.5 text-rose-500" />
//               <span>عنوان المقر المعتمد</span>
//             </Label>
//             <Input id="address" defaultValue={siteSettings.address} className="bg-white border-slate-200 rounded-xl text-slate-800 font-medium focus-visible:ring-[#0b6a6b]" />
//           </div>

//           {/* صندوق تنبيه مخصص للـ UI الجديد */}
//           <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
//             <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
//             <p className="text-xs sm:text-sm text-amber-800 font-medium leading-relaxed">
//               عند الضغط على أزرار الحفظ، يمكنك لاحقاً ربط هذا النموذج برمجياً لحفظ البيانات داخل قوالب الـ Database أو استدعاء ملفات الـ API الخاصة بك.
//             </p>
//           </div>

//           {/* واجهة زر الحفظ الخاص بالمعلومات الأساسية */}
//           <div className="flex justify-end pt-2">
//             <Button type="button" className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-6">
//               <Save className="w-4 h-4" />
//               <span>حفظ المعلومات الأساسية</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* كرت شبكات التواصل الاجتماعي */}
//       <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
//         <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
//           <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
//             <Globe className="w-4 h-4 text-[#0b6a6b]" />
//             <span>روابط المنصات الإجتماعية</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-5">
//           {[
//             { id: 'fb', label: 'فيسبوك', value: siteSettings.facebook, iconColor: 'text-blue-600' },
//             { id: 'ig', label: 'إنستجرام', value: siteSettings.instagram, iconColor: 'text-pink-600' },
//             { id: 'yt', label: 'قناة يوتيوب', value: siteSettings.youtube, iconColor: 'text-rose-600' },
//           ].map((social) => (
//             <div key={social.id} className="space-y-1.5 text-right">
//               <Label htmlFor={social.id} className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
//                 <Share2 className={cn("w-3.5 h-3.5", social.iconColor)} />
//                 <span>{social.label}</span>
//               </Label>
//               <Input
//                 id={social.id}
//                 defaultValue={social.value || ''}
//                 dir="ltr"
//                 className="bg-white border-slate-200 rounded-xl text-slate-800 font-medium focus-visible:ring-[#0b6a6b]"
//                 placeholder="أدخل رابط الحساب الكامل هنا..."
//               />
//             </div>
//           ))}

//           {/* واجهة زر حفظ روابط السوشيال ميديا */}
//           <div className="flex justify-end pt-2">
//             <Button type="button" className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-6">
//               <Save className="w-4 h-4" />
//               <span>حفظ روابط التواصل</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* كرت مواعيد ساعات العمل وأيام الإجازات */}
//       <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
//         <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
//           <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
//             <Clock className="w-4 h-4 text-[#0b6a6b]" />
//             <span>جدول أوقات العمل الأسبوعي</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-6">
//           <div className="divide-y divide-slate-100">
//             {workingHours.map((wh) => (
//               <div key={wh.day} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
//                 <span className="font-bold text-slate-700 text-xs sm:text-sm">{wh.day}</span>
//                 {wh.open ? (
//                   <span className="text-xs sm:text-sm font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/40" dir="ltr">
//                     {wh.from} - {wh.to}
//                   </span>
//                 ) : (
//                   <span className="text-xs sm:text-sm text-rose-600 bg-rose-50 border border-rose-100 font-bold px-3 py-1 rounded-lg">
//                     عطلة نهاية الأسبوع
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* واجهة زر الحفظ الخاص بأوقات العمل */}
//           <div className="flex justify-end pt-2">
//             <Button type="button" className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-6">
//               <Save className="w-4 h-4" />
//               <span>حفظ ساعات العمل</span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useSettings, useUpdateSettings, useWorkingHours, useUpdateWorkingHour } from '@/components/hooks/useSettings'
import { Settings, Phone, Mail, MapPin, Globe, Clock, Share2, Info, Save, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useDoctor, useUpdateDoctor } from '@/components/hooks/useDoctor'
import { UploadDoctorImage } from '@/lib/admin/doctor'
import { User, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function SettingsAdminPage() {
  const { data: settings, isLoading: loadingSettings } = useSettings()
  const { data: workingHours = [], isLoading: loadingHours } = useWorkingHours()
  const { mutate: updateSettings, isPending: savingSettings } = useUpdateSettings()
  const { mutate: updateWorkingHour, isPending: savingHours } = useUpdateWorkingHour()
  const { data: doctor, isLoading: loadingDoctor } = useDoctor()
  const { mutate: updateDoctor, isPending: savingDoctor } = useUpdateDoctor()
  const [form, setForm] = useState({
    clinic_name: '',
    doctor_name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    facebook: '',
    instagram: '',
    youtube: '',
  })
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    title: '',
    bio: '',
    experience: 0,
    image: '',
  })
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  // لما الداتا تيجي من Supabase حطها في الـ form
  useEffect(() => {
    if (settings) {
      setForm({
        clinic_name: settings.clinic_name ?? '',
        doctor_name: settings.doctor_name ?? '',
        phone: settings.phone ?? '',
        whatsapp: settings.whatsapp ?? '',
        email: settings.email ?? '',
        address: settings.address ?? '',
        facebook: settings.facebook ?? '',
        instagram: settings.instagram ?? '',
        youtube: settings.youtube ?? '',
      })
    }
  }, [settings])
  useEffect(() => {
    if (doctor) {
      setDoctorForm({
        name: doctor.name ?? '',
        title: doctor.title ?? '',
        bio: doctor.bio ?? '',
        experience: doctor.experience ?? 0,
        image: doctor.image ?? '',
      })
      setPreviewUrl(doctor.image ?? null)
    }
  }, [doctor])
  const handleDoctorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await UploadDoctorImage(file)
      setDoctorForm(prev => ({ ...prev, image: url }))
      setPreviewUrl(url)
    } catch (err) {
      console.error('فشل رفع الصورة:', err)
    } finally {
      setUploading(false)
    }
  }
  const patch = (field: string, value: string) => {
    setForm(current => ({ ...current, [field]: value }))
  }

  if (loadingSettings || loadingHours) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-xl w-1/4" />
      <div className="h-64 bg-slate-100 rounded-2xl" />
      <div className="h-64 bg-slate-100 rounded-2xl" />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">الإعدادات العامة</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light">تحديث إعدادات وبيانات العيادة وروابط التواصل الاجتماعي</p>
      </div>
      {/* بيانات الدكتور */}
      <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#0b6a6b]" />
            <span>بيانات الطبيب</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">

          {/* صورة الدكتور */}
          <div className="space-y-1.5 text-right">
            <Label className="text-xs font-bold text-slate-700">صورة الدكتور</Label>
            {previewUrl ? (
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-slate-200">
                <Image src={previewUrl} alt="صورة الدكتور" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => { setPreviewUrl(null); setDoctorForm(prev => ({ ...prev, image: '' })) }}
                  className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-[#0b6a6b]/40 hover:bg-slate-50 transition-all">
                {uploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-[#0b6a6b]" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs text-slate-400">ارفع صورة</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleDoctorImageUpload} className="hidden" disabled={uploading} />
              </label>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700">اسم الدكتور</Label>
              <Input value={doctorForm.name} onChange={e => setDoctorForm(prev => ({ ...prev, name: e.target.value }))} className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700">سنوات الخبرة</Label>
              <Input type="number" value={doctorForm.experience} onChange={e => setDoctorForm(prev => ({ ...prev, experience: Number(e.target.value) }))} className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
            </div>
          </div>

          <div className="space-y-1.5 text-right">
            <Label className="text-xs font-bold text-slate-700">التخصص</Label>
            <Input value={doctorForm.title} onChange={e => setDoctorForm(prev => ({ ...prev, title: e.target.value }))} className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
          </div>

          <div className="space-y-1.5 text-right">
            <Label className="text-xs font-bold text-slate-700">نبذة عن الدكتور</Label>
            <textarea
              value={doctorForm.bio}
              onChange={e => setDoctorForm(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b6a6b] resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => updateDoctor({ ...doctorForm })}
              disabled={savingDoctor}
              className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-6"
            >
              {savingDoctor ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ بيانات الدكتور</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* معلومات العيادة */}
      <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-[#0b6a6b]" />
            <span>معلومات العيادة الأساسية</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700">اسم العيادة</Label>
              <Input value={form.clinic_name} onChange={e => patch('clinic_name', e.target.value)} className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700">اسم الطبيب</Label>
              <Input value={form.doctor_name} onChange={e => patch('doctor_name', e.target.value)} className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0b6a6b]" />رقم الهاتف
              </Label>
              <Input value={form.phone} onChange={e => patch('phone', e.target.value)} dir="ltr" className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
            </div>
            <div className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />رقم الواتساب
              </Label>
              <Input value={form.whatsapp} onChange={e => patch('whatsapp', e.target.value)} dir="ltr" className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
            </div>
          </div>

          <div className="space-y-1.5 text-right">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#0b6a6b]" />البريد الإلكتروني
            </Label>
            <Input value={form.email} onChange={e => patch('email', e.target.value)} dir="ltr" className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
          </div>

          <div className="space-y-1.5 text-right">
            <Label className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />العنوان
            </Label>
            <Input value={form.address} onChange={e => patch('address', e.target.value)} className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]" />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => updateSettings({
                clinic_name: form.clinic_name,
                doctor_name: form.doctor_name,
                phone: form.phone,
                whatsapp: form.whatsapp,
                email: form.email,
                address: form.address,
              })}
              disabled={savingSettings}
              className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-6"
            >
              {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ المعلومات</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* السوشيال ميديا */}
      <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#0b6a6b]" />
            <span>روابط التواصل الاجتماعي</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {[
            { id: 'facebook', label: 'فيسبوك', iconColor: 'text-blue-600' },
            { id: 'instagram', label: 'إنستجرام', iconColor: 'text-pink-600' },
            { id: 'youtube', label: 'يوتيوب', iconColor: 'text-rose-600' },
          ].map((social) => (
            <div key={social.id} className="space-y-1.5 text-right">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Share2 className={cn("w-3.5 h-3.5", social.iconColor)} />
                <span>{social.label}</span>
              </Label>
              <Input
                value={form[social.id as keyof typeof form]}
                onChange={e => patch(social.id, e.target.value)}
                dir="ltr"
                className="bg-white border-slate-200 rounded-xl focus-visible:ring-[#0b6a6b]"
                placeholder="أدخل الرابط هنا..."
              />
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <Button
              onClick={() => updateSettings({
                facebook: form.facebook,
                instagram: form.instagram,
                youtube: form.youtube,
              })}
              disabled={savingSettings}
              className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-6"
            >
              {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>حفظ الروابط</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* أوقات العمل */}
      <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/70 rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#0b6a6b]" />
            <span>أوقات العمل</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {workingHours.map((wh) => (
            <div key={wh.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <span className="font-bold text-slate-700 text-xs sm:text-sm">{wh.day}</span>
              {wh.is_open ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={wh.from_time ?? ''}
                    onChange={e => updateWorkingHour({ ...wh, from_time: e.target.value })}
                    className="w-28 h-8 text-xs border-slate-200 rounded-xl"
                  />
                  <span className="text-slate-400 text-xs">—</span>
                  <Input
                    type="time"
                    value={wh.to_time ?? ''}
                    onChange={e => updateWorkingHour({ ...wh, to_time: e.target.value })}
                    className="w-28 h-8 text-xs border-slate-200 rounded-xl"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateWorkingHour({ ...wh, is_open: false })}
                    className="h-8 text-xs text-rose-500 border-rose-200 hover:bg-rose-50 rounded-xl"
                  >
                    إغلاق
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-600 bg-rose-50 border border-rose-100 font-bold px-3 py-1 rounded-lg">عطلة</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateWorkingHour({ ...wh, is_open: true, from_time: '09:00', to_time: '21:00' })}
                    className="h-8 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 rounded-xl"
                  >
                    فتح
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}