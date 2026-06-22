import Image from 'next/image'
import Link from 'next/link'
import { teamMembers, doctor } from '@/lib/data'
import { Award, GraduationCap, Stethoscope, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TeamPage() {
  return (
    <main className="bg-slate-50/30 min-h-screen">

      {/* Hero - البانر العلوي المتدرج */}
      <section className="hero-gradient pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-10 w-64 h-64 rounded-full border border-white -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-balance mb-4 tracking-tight">
            الكوادر والطبية المساعدة
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            فريق طبي متكامل ومتخصص يعمل بأعلى معايير التنسيق لتقديم رعاية صحية آمنة وموثوقة تضمن راحتكم وسلامتكم.
          </p>
        </div>
      </section>

      {/* Lead Doctor - الملف التعريفي للطبيب الرئيسي */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
              {/* حاوية صورة الطبيب */}
              <div className="relative h-96 md:h-auto min-h-[400px] bg-slate-50">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-w-7xl) 50vw"
                />
              </div>
              
              {/* بيانات الطبيب وتفاصيل المؤهلات */}
              <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
                <Badge className="w-fit mb-4 bg-[#0b6a6b]/10 text-[#0b6a6b] border-transparent hover:bg-[#0b6a6b]/10 font-bold px-3 py-1 text-xs rounded-lg">
                  الطبيب الاستشاري المتخصص
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
                  {doctor.name}
                </h2>
                <p className="text-[#0b6a6b] font-bold text-sm sm:text-base mb-5">
                  {doctor.title}
                </p>
                <p className="text-slate-500 leading-relaxed mb-8 font-light text-sm sm:text-base">
                  {doctor.bio}
                </p>

                {/* كروت العدادات السريعة (الخبرة والشهادات) */}
                <div className="grid grid-cols-2 gap-6 mb-8 border-t border-b border-slate-50 py-6">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0b6a6b]/5 flex items-center justify-center shrink-0 border border-[#0b6a6b]/5">
                      <Stethoscope className="w-5 h-5 text-[#0b6a6b] stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">سنوات الخبرة</p>
                      <p className="font-extrabold text-slate-800 text-sm">+{doctor.experience} سنة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100/50">
                      <Award className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-medium">الاعتمادات الدولية</p>
                      <p className="font-extrabold text-slate-800 text-sm">{doctor.certifications.length} شهادات</p>
                    </div>
                  </div>
                </div>

                {/* المؤهلات العلمية بالتفصيل */}
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#0b6a6b] stroke-[2.2]" />
                    المؤهلات العلمية والزمالات
                  </h3>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0b6a6b] mt-2 shrink-0 animate-pulse" />
                        <span className="text-slate-500 font-light leading-relaxed">
                          {edu.degree} - <span className="text-slate-700 font-semibold">{edu.university}</span>
                          <span className="text-[#0b6a6b] font-bold font-mono mr-1.5">({edu.year})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid - سكشن الطاقم الطبي المساعد */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              الفريق المساعد وهيئة التمريض
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-light">
              يساند الطبيب نخبة من الأخصائيين والممرضين المؤهلين لتهيئة الرعاية الفائقة والمتابعة الشاملة لكل حالة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(1).map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col h-full"
              >
                {/* صورة عضو الطاقم */}
                <div className="relative h-60 overflow-hidden bg-slate-50">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-7xl) 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
                </div>
                
                {/* تفاصيل العضو */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-base text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-[#0b6a6b] text-xs font-bold mb-1.5">{member.role}</p>
                  {member.specialty && (
                    <p className="text-slate-400 font-light text-xs leading-relaxed">{member.specialty}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - سكشن الدعوة للحجز السفلي */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            ابدأ رحلة تعافيك مع عيادتنا اليوم
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed font-light text-sm sm:text-base">
            فريقنا الاستشاري والمساعد متأهب لتقديم رعاية صحية دقيقة وعالية المستوى في بيئة معقمة ومريحة كلياً.
          </p>
          <Link href="/booking" className="block w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-2 h-12 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold px-8 shadow-md shadow-[#0b6a6b]/10 transition-all duration-300 group text-sm"
            >
              <span>احجز موعد استشارتك الآن</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}