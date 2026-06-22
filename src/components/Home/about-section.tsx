import Image from 'next/image'
import { GraduationCap, Award, CheckCircle } from 'lucide-react'
import { doctor } from '@/lib/data'

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            عن الطبيب
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            تعرف على دكتورك
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground rounded-2xl shadow-xl p-6 text-center">
              <span className="text-4xl font-bold block">+{doctor.experience}</span>
              <span className="text-sm opacity-90">سنة خبرة</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{doctor.name}</h3>
            <p className="text-primary font-semibold mb-6">{doctor.title}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{doctor.bio}</p>

            {/* Education */}
            <div className="mb-8">
              <h4 className="flex items-center gap-2 font-semibold text-foreground mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                المؤهلات العلمية
              </h4>
              <div className="space-y-3">
                {doctor.education.map((edu, i) => (
                  <div key={i} className="flex items-start gap-3 bg-muted/40 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-xs font-bold">{edu.year}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{edu.degree}</p>
                      <p className="text-muted-foreground text-xs">{edu.university}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="flex items-center gap-2 font-semibold text-foreground mb-4">
                <Award className="w-5 h-5 text-primary" />
                الشهادات والزمالات
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
