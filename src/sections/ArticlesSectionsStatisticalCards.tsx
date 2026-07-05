import { Card, CardContent } from '@/components/ui/card';
interface ArticlesSectionsStatisticalCardsProps {
    serverArticles: any[];
}
export function ArticlesSectionsStatisticalCards({ serverArticles }: ArticlesSectionsStatisticalCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card className="border-slate-200/60 bg-white shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-6 text-right">
                    <p className="text-3xl font-black text-slate-800 dark:text-white font-mono tracking-tight">{serverArticles.length}</p>
                    <p className="text-slate-400 text-xs font-bold mt-1.5 tracking-wide">إجمالي المقالات المدرجة</p>
                </CardContent>
            </Card>
            <Card className="border-slate-200/60 bg-white shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-6 text-right">
                    <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">{serverArticles.filter((a) => a.published).length}</p>
                    <p className="text-slate-400 text-xs font-bold mt-1.5 tracking-wide">المقالات المنشورة حياً</p>
                </CardContent>
            </Card>
        </div>
    )
}