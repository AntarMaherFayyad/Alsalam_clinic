'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar, Search, Tag, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { articles, articleCategories } from '@/lib/data'
async function fetchArticles() {
    // Simulate fet

    return articles.filter((a) => a.published)
}
export default function ArticlesPage() {

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('الكل')

    const filteredArticles = articles
        .filter((a) => a.published)
        .filter((a) => category === 'الكل' || a.category === category)
        .filter((a) =>
            search === '' ||
            a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
            a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
        )

    return (
        <>
            <div className="hero-gradient pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        المقالات الطبية والتوعوية
                    </h1>
                    <p className="text-white/85 max-w-xl mx-auto font-light text-sm sm:text-base">
                        مقالات طبية متخصصة وموثوقة لرفع الوعي الصحي لضمان سلامتك وسلامة أسرتك.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="flex flex-col lg:flex-row gap-6 mb-12 items-stretch lg:items-center justify-between">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="ابحث عن العناوين، المحتوى، أو الوسوم الطبية..."
                            className="pr-11 h-11 bg-slate-50 border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0b6a6b] focus:ring-4 focus:ring-[#0b6a6b]/5 text-sm transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        {['الكل', ...articleCategories].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${category === cat
                                    ? 'bg-[#0b6a6b] text-white border-transparent shadow-md shadow-[#0b6a6b]/10'
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-[#0b6a6b]/5 hover:text-[#0b6a6b] hover:border-[#0b6a6b]/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredArticles.length === 0 ? (
                    <div className="text-center py-24 text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                        <p className="text-base font-medium">لا توجد مقالات طبية تطابق معايير بحثك الحالية</p>
                        <p className="text-xs text-slate-400 mt-1">جرّب كتابة كلمات أخرى أو تغيير القسم المختار</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <Card
                                key={article.id}
                                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
                            >
                                {/* حاوية الصورة والبايدج الفخم للتصنيف */}
                                <div className="relative h-52 overflow-hidden bg-slate-50">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-w-7xl) 33vw"
                                    />
                                    <div className="absolute top-3.5 right-3.5 z-10">
                                        <span className="bg-[#0b6a6b] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* المحتوى النصي للمقال */}
                                <CardContent className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3 font-medium">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{article.createdAt}</span>
                                    </div>

                                    <h3 className="font-bold text-slate-800 text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-[#0b6a6b] transition-colors duration-200">
                                        {article.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm line-clamp-2 mb-5 leading-relaxed font-light flex-1">
                                        {article.excerpt}
                                    </p>

                                    {/* تاق الرابط التميزي والوسوم */}
                                    {article.tags && article.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {article.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] px-2.5 py-1 rounded-lg font-medium">
                                                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-slate-50 mt-auto">
                                        <Link href={`/articles/${article.slug}`}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-[#0b6a6b] hover:text-[#0b6a6b] hover:bg-[#0b6a6b]/5 gap-1.5 p-0 px-3 h-9 rounded-lg font-semibold text-xs transition-all duration-300"
                                            >
                                                <span>اقرأ المقال كاملاً</span>
                                                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}