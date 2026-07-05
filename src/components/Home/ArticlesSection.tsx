import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GetArticles } from '@/lib/admin/articles'

export async function ArticlesSection() {
  // جلب البيانات مباشرة بشكل خادمي (Server-side Component)
  const data = await GetArticles()
  
  // تصفية جلب آخر 3 مقالات منشورة فقط لعرضها في الهوم بيج
  const published = data.filter((a) => a.is_published).slice(0, 3)

  if (published.length === 0) return null; // إخفاء القسم تلقائياً إذا لم تكن هناك مقالات منشورة بعد

  return (
    <section id="articles" className="py-24 bg-slate-50/50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* هيدر القسم */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14 text-right">
          <div className="flex flex-col items-start">
            <span className="inline-flex bg-[#0b6a6b]/10 text-[#0b6a6b] px-4 py-1.5 rounded-xl text-xs font-bold mb-3 tracking-wide">
              المدونة الطبية
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              أحدث المقالات والتوعية الصحية
            </h2>
          </div>
          
          <Link href="/articles" className="shrink-0">
            <Button 
              variant="outline" 
              className="border-slate-200 text-slate-700 bg-white hover:bg-[#0b6a6b] hover:text-white hover:border-[#0b6a6b] rounded-xl font-bold px-5 h-11 text-sm shadow-sm transition-all duration-300 gap-2 group flex-row-reverse"
            >
              <span>عرض جميع المقالات</span>
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* شبكة المقالات الثلاثة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
          {published.map((article) => {
            // تأمين مصفوفة الوسوم لمنع أخطاء الـ map
            const tagsArray = Array.isArray(article.tags) ? article.tags : [];

            return (
              <Card 
                key={article.id} 
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                {/* حاوية الصورة وعلامة التصنيف */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <Image
                    src={article.image_url || '/images/medical-placeholder.jpg'} // تعديل مسار الـ Fallback الموحد لعيادة السلام
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-7xl) 33vw"
                  />
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="bg-[#0b6a6b] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md backdrop-blur-md bg-opacity-95">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* محتوى الكارت */}
                <CardContent className="p-6 flex flex-col flex-1">
                  {/* تاريخ النشر المنسق عربياً */}
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(article.created_at).toLocaleDateString('ar-EG')}</span>
                  </div>
                  
                  {/* العنوان */}
                  <h3 className="font-bold text-slate-800 text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-[#0b6a6b] transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  {/* المقتطف النصي */}
                  <p className="text-slate-500 text-sm line-clamp-2 mb-5 leading-relaxed font-light flex-1">
                    {article.excerpt}
                  </p>
                  
                  {/* الأوسمة والـ Tags */}
                  {tagsArray.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tagsArray.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] px-2.5 py-1 rounded-lg font-medium"
                        >
                          <Tag className="w-2.5 h-2.5 text-slate-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* زر القراءة كاملاً */}
                  <div className="pt-4 border-t border-slate-50 mt-auto">
                    <Link href={`/articles/${article.slug}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#0b6a6b] hover:text-[#0b6a6b] hover:bg-[#0b6a6b]/5 gap-1.5 p-0 px-3 h-9 rounded-lg font-semibold text-xs transition-all duration-300 flex-row-reverse"
                      >
                        <span>اقرأ المزيد</span>
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

      </div>
    </section>
  )
}