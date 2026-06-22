import Image from 'next/image'
import { galleryItems } from '@/lib/data'
import { cn } from '@/lib/utils'

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0b6a6b]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-flex bg-[#0b6a6b]/10 text-[#0b6a6b] px-4 py-1.5 rounded-xl text-xs font-bold mb-4 tracking-wide">
            معرض الصور
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            جولة مرئية داخل عيادتنا
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-light">
            نوفر بيئة طبية معقمة، مريحة وحديثة مجهزة بالكامل بأحدث الأجهزة والمعدات لتقديم رعاية تليق بسلامتكم.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[190px]">
          {galleryItems.slice(0, 6).map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "relative rounded-2xl overflow-hidden group border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60",
                i === 0 ? "col-span-2 row-span-2 h-full" : "col-span-1 row-span-1"
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes={i === 0 ? "(max-w-7xl) 66vw" : "(max-w-7xl) 33vw"}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out w-full">
                  <p className="text-white font-bold text-sm sm:text-base mb-1 tracking-wide">
                    {item.title}
                  </p>
                  {item.album && (
                    <span className="inline-block bg-white/20 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                      {item.album}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}