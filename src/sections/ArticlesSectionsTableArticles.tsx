"use client";

import { FileText, Eye, EyeOff, Tag, ExternalLink, Trash2, Edit, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
}

interface TableProps {
  articles: any[];
  setIsOpen: (open: boolean) => void;
  setForm: (form: any) => void;
  setEditingId: (id: string | null) => void;
  updateArticle: (article: any) => void; // إضافة التعريف هنا
  deleteArticle?: (id: string) => void;
  isDeleting: boolean;
}
export function ArticlesSectionsTableArticles({
  articles,
  setIsOpen,
  setForm,
  setEditingId,
  updateArticle,
  deleteArticle,
  isDeleting,
}: TableProps) {

  const handleEditClick = (article: Article) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      category: article.category,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      published: article.published,
    });
    setIsOpen(true);
  };

  const handleTogglePublish = (article: any) => {
    updateArticle({
      ...article,
      is_published: !article.is_published // عكس حالة النشر الحالية
    });
  };

const handleDeleteClick = (id: string) => {
    deleteArticle?.(id);
};

  return (
    <Card className="border-slate-200/60 bg-white shadow-sm rounded-2xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800/40 dark:border-slate-800 text-right">
        <CardTitle className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#0b6a6b]" />
          <span>المقالات الطبية الحالية</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {articles.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400 font-medium">لا توجد مقالات مضافة حالياً.</div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-200/50 hover:border-[#0b6a6b]/20 hover:shadow-md hover:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:hover:bg-slate-900 transition-all duration-300 text-right"
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-[#0b6a6b]/10 border border-[#0b6a6b]/5 flex items-center justify-center shrink-0 text-[#0b6a6b] dark:bg-[#0b6a6b]/20">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-800 text-xs sm:text-sm truncate max-w-[280px] sm:max-w-md dark:text-white">
                        {article.title}
                      </h3>

                      {article.published ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200/60 text-[10px] font-bold rounded-lg px-2 py-0.5 flex items-center gap-1 shrink-0 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                          <Eye className="w-3 h-3" />
                          <span>منشور للمرضى</span>
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-[10px] font-bold rounded-lg px-2 py-0.5 flex items-center gap-1 shrink-0 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
                          <EyeOff className="w-3 h-3" />
                          <span>مسودة داخلية</span>
                        </Badge>
                      )}
                    </div>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal opacity-90 line-clamp-2 sm:line-clamp-1 dark:text-slate-400">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-3 mt-2 flex-wrap pt-0.5">
                      <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#0b6a6b] bg-[#0b6a6b]/5 border border-[#0b6a6b]/10 px-2 py-0.5 rounded-lg font-bold dark:bg-[#0b6a6b]/20 dark:text-teal-400">
                        <Tag className="w-3 h-3 opacity-90" />
                        <span>{article.category}</span>
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-semibold">{article.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center shrink-0 flex-wrap w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800 justify-end">

                  <Button
                    onClick={() => handleTogglePublish(article)}
                    variant="outline" size="sm" className="h-9 text-xs font-bold text-slate-600 dark:text-slate-300 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 gap-1 shadow-sm"
                  >
                    {article.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{article.published ? 'إخفاء' : 'نشر'}</span>
                  </Button>

                  <Button
                    onClick={() => handleEditClick(article)}
                    variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white shadow-sm" title="تعديل"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    onClick={() => handleDeleteClick(article.id)}
                    disabled={isDeleting}
                    variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-700 text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 dark:hover:bg-rose-950/30 shadow-sm" title="حذف"
                  >
                    {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </Button>

                  <a
                    href={`/articles/${article.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 px-4 rounded-xl transition-all shadow-sm"
                  >
                    <span>عرض</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/90" />
                  </a>
                </div>

              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}