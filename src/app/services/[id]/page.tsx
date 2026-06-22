import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ChevronRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ id: s.id }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params
  const service = services.find((s) => s.id === id)
  if (!service) notFound()

  const related = services.filter((s) => s.id !== service.id && s.visible).slice(0, 3)

  return (
    <>
      <main>
        {/* Breadcrumb */}
        <div className="hero-gradient pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-4">
              <Link href="/" className="hover:text-white">الرئيسية</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/services" className="hover:text-white">الخدمات</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{service.title}</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">{service.title}</h1>
            {service.price !== undefined && (
              <p className="text-white/85 mt-2 text-xl">السعر: {service.price} ريال</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="relative h-72 rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">عن هذه الخدمة</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{service.longDescription}</p>
              <div className="bg-muted/40 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">ماذا يشمل هذا الكشف؟</h3>
                <ul className="space-y-3">
                  {['فحص سريري شامل', 'مراجعة التاريخ المرضي', 'خطة علاجية مخصصة', 'متابعة ما بعد الكشف'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-4">احجز هذه الخدمة</h3>
                {service.price !== undefined && (
                  <div className="flex items-center justify-between bg-primary/10 rounded-xl p-4 mb-4">
                    <span className="text-muted-foreground text-sm">السعر</span>
                    <span className="text-primary font-bold text-xl">{service.price} ريال</span>
                  </div>
                )}
                <Link href={`/booking?service=${service.id}`}>
                  <Button className="w-full gap-2 mb-3">
                    <Calendar className="w-5 h-5" />
                    احجز الآن
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">استفسر عن الخدمة</Button>
                </Link>
              </div>

              {related.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-foreground mb-4">خدمات أخرى</h3>
                  <div className="space-y-3">
                    {related.map((s) => (
                      <Link key={s.id} href={`/services/${s.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary text-xs font-bold">{s.title.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{s.title}</p>
                          {s.price !== undefined && <p className="text-primary text-xs">{s.price} ريال</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
