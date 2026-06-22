import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Tag, ChevronLeft, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { articles } from '@/lib/data'

interface Props {
    params: Promise<{ slug: string }>
}

export default async function ArticleDetailPage({ params }: Props) {
    const { slug } = await params
    const article = articles.find((a) => a.slug === slug)
    if (!article) notFound()

    const related = articles.filter((a) => a.id !== article.id && a.published && a.category === article.category).slice(0, 3)

    return (
        <>
            <main className="bg-slate-50/30 min-h-screen">

                {/* البانر العلوي المتدرج */}
                <div className="hero-gradient pt-32 pb-14 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                        {/* Breadcrumbs - مسار التنقل العربي المضبوط بـ ChevronLeft */}
                        <nav className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm mb-5 flex-wrap font-light">
                            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
                            <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
                            <Link href="/articles" className="hover:text-white transition-colors">المقالات</Link>
                            <ChevronLeft className="w-3.5 h-3.5 opacity-60" />
                            <span className="text-white font-medium max-w-[200px] sm:max-w-none truncate">{article.title}</span>
                        </nav>

                        <span className="bg-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl mb-4 inline-block backdrop-blur-sm">
                            {article.category}
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-extrabold text-white text-balance leading-tight mb-5 tracking-tight">
                            {article.title}
                        </h1>

                        {/* بيانات الميتا للمقال */}
                        <div className="flex items-center gap-4 text-white/80 text-xs flex-wrap font-medium">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 opacity-80" />
                                {article.createdAt}
                            </span>
                            <div className="flex items-center gap-2 flex-wrap">
                                {article.tags.map((tag) => (
                                    <span key={tag} className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg text-[11px]">
                                        <Tag className="w-3 h-3 opacity-70" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

                    {/* Featured Image - الصورة البارزة للمقال */}
                    <div className="relative h-64 sm:h-[420px] rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 mb-12 border border-slate-100">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-w-4xl) 100vw"
                        />
                    </div>

                    {/* Content - محتوى المقال الطبي */}
                    <div className="prose prose-slate prose-lg max-w-none text-slate-700">
                        {/* المقتطف كاقتباس تميزي مبطن بوردر تيل */}
                        <p className="text-base sm:text-lg text-[#0b6a6b] bg-[#0b6a6b]/5 leading-relaxed font-bold mb-8 border-r-4 border-[#0b6a6b] pr-4 py-3 rounded-l-xl">
                            {article.excerpt}
                        </p>
                        <div className="text-slate-600 font-light leading-yxl text-sm sm:text-base whitespace-pre-line">
                            {article.content}
                        </div>
                    </div>

                    {/* Tags Section - الكلمات المفتاحية السفلية */}
                    <div className="mt-12 pt-8 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wide">الكلمات المفتاحية والوسوم:</p>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                                <span key={tag} className="bg-[#0b6a6b]/5 border border-[#0b6a6b]/10 text-[#0b6a6b] font-medium text-xs px-3 py-1.5 rounded-xl">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back Button - زر العودة للمقالات بـ RTL صحيح */}
                    <div className="mt-10 pt-4">
                        <Link href="/articles">
                            <Button
                                variant="outline"
                                className="gap-2 h-11 border-slate-200 text-slate-700 bg-white hover:bg-[#0b6a6b] hover:text-white hover:border-[#0b6a6b] rounded-xl font-bold text-xs shadow-sm transition-all duration-300 group px-5"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                <span>العودة لجميع المقالات</span>
                            </Button>
                        </Link>
                    </div>

                    {/* Related Articles - مقالات ذات صلة */}
                    {related.length > 0 && (
                        <div className="mt-20 border-t border-slate-100 pt-12">
                            <h2 className="text-xl font-extrabold text-slate-800 mb-8 tracking-tight">مقالات ذات صلة قد تهمك</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {related.map((rel) => (
                                    <Card
                                        key={rel.id}
                                        className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                                    >
                                        <div className="relative h-36 overflow-hidden bg-slate-50">
                                            <Image
                                                src={rel.image}
                                                alt={rel.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-w-4xl) 33vw"
                                            />
                                        </div>
                                        <CardContent className="p-4 flex flex-col flex-1 mt-auto">
                                            <p className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 group-hover:text-[#0b6a6b] transition-colors duration-200 mb-4 leading-snug flex-1">
                                                {rel.title}
                                            </p>
                                            <Link href={`/articles/${rel.slug}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-[#0b6a6b] hover:text-[#0b6a6b] hover:bg-[#0b6a6b]/5 p-0 px-2.5 h-8 rounded-lg font-semibold text-[11px] gap-1 transition-all duration-300 w-fit"
                                                >
                                                    <span>اقرأ المزيد</span>
                                                    <ArrowLeft className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-1" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </>
    )
}