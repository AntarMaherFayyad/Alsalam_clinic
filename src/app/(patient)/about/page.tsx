
import Image from 'next/image'
import Link from 'next/link'
import { Award, CheckCircle2, GraduationCap, Stethoscope, Users, Clock } from 'lucide-react'
import { GetDoctor } from '@/lib/admin/doctor'

export const metadata = {
  title: 'عن الطبيب',
  description: 'تعرف على خلفية الدكتور العلمية والعملية ورحلته في خدمة المرضى',
}

export default async function AboutPage() {
  const doctor = await GetDoctor()

  if (!doctor) return null

  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-balance mb-4">عن الطبيب</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            تعرف على خلفية الدكتور العلمية والعملية ورحلته في خدمة المرضى
          </p>
        </div>
      </section>

      {/* Doctor Bio */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={doctor.image}
                  alt={doctor?.name || "صورة الطبيب"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-xl border border-border p-6 hidden lg:block">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">+{doctor.experience}</p>
                    <p className="text-xs text-muted-foreground mt-1">سنوات الخبرة</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">+5000</p>
                    <p className="text-xs text-muted-foreground mt-1">مريض سعيد</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                نبذة شخصية
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
                {doctor.name}
              </h2>
              <p className="text-primary font-medium text-lg mb-6">{doctor.title}</p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {doctor.bio}
              </p>

              <div className="grid grid-cols-2 gap-4 lg:hidden mb-8">
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">الخبرة</p>
                    <p className="font-semibold text-sm">+{doctor.experience} سنة</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-4">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">المرضى</p>
                    <p className="font-semibold text-sm">+5000</p>
                  </div>
                </div>
              </div>

              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <Stethoscope className="w-5 h-5" />
                احجز كشفاً الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground text-balance mb-4">المؤهلات العلمية</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              مسيرة علمية حافلة من أعرق الجامعات المحلية والدولية
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {doctor.education.map((edu, i) => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 z-10 shadow-md">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-6 flex-1 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-foreground mb-1">{edu.degree}</h3>
                          <p className="text-muted-foreground text-sm">{edu.university}</p>
                        </div>
                        <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-lg shrink-0">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground text-balance mb-4">الشهادات والزمالات</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              اعترافات مهنية دولية تؤكد الكفاءة والخبرة العالية
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {doctor.certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-4 bg-card rounded-2xl border border-border p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground leading-relaxed">{cert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground text-balance mb-4">لماذا تختارنا؟</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'خبرة واسعة', desc: 'أكثر من 15 عاماً في تشخيص وعلاج الأمراض الباطنية والمزمنة' },
              { title: 'مرافق حديثة', desc: 'أجهزة طبية متطورة ومختبر داخلي متكامل لضمان دقة التشخيص' },
              { title: 'رعاية شاملة', desc: 'برامج متابعة دورية ومتكاملة للمرضى المزمنين' },
              { title: 'مواعيد مرنة', desc: 'جدول مواعيد مرن يلائم جميع الأوقات طوال أيام الأسبوع' },
              { title: 'تواصل مستمر', desc: 'متاح للتواصل وتلقي الاستفسارات عبر قنوات متعددة' },
              { title: 'أسعار مناسبة', desc: 'خدمات طبية عالية الجودة بأسعار مناسبة وقبول للتأمين الطبي' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-card rounded-2xl border border-border p-5 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
