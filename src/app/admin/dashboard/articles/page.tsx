"use client";
import { useState } from 'react';
import { ArticlesSectionsDialog } from '@/sections/ArticlesSectionsDialog';
import { ArticlesSectionsStatisticalCards } from '@/sections/ArticlesSectionsStatisticalCards';
import { ArticlesSectionsTableArticles } from '@/sections/ArticlesSectionsTableArticles';
import {
  useArticles,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle
} from '@/components/hooks/useArticles'

const initialFormState = {
  title: '',
  category: '',
  slug: '',
  excerpt: '',
  content: '',
  is_published: true,
  image_url: null as string | null,
}

export default function ArticlesAdminPage() {
  const { data: serverArticles = [], isLoading, isError
  } = useArticles();
  const { mutate: createArticle, isPending: isCreating } = useCreateArticle();
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle();
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle()



  const [form, setForm] = useState(initialFormState);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);


  if (isLoading) {
    return (
      <div className="space-y-6 p-1 animate-pulse" dir="rtl">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        </div>
        <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-3" dir="rtl">
        <p className="text-rose-500 font-bold text-sm">حدث خطأ أثناء تحميل المقالات الطبيّة.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-xl text-xs">إعادة المحاولة</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1" dir="rtl">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-right">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight dark:text-white">إدارة المقالات</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">نشر وإدارة المقالات والتوعية الطبية على الموقع العام للعيادة</p>
        </div>

        <ArticlesSectionsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          form={form}
          setForm={setForm}
          editingId={editingId}
          setEditingId={setEditingId}
          createArticle={createArticle}
          isCreating={isCreating}
          updateArticle={updateArticle}
          isUpdating={isUpdating}
        />
      </div>
      <ArticlesSectionsStatisticalCards serverArticles={serverArticles} />
      <ArticlesSectionsTableArticles
        articles={serverArticles}
        setIsOpen={setIsOpen}
        setForm={setForm}
        setEditingId={setEditingId}
        updateArticle={updateArticle}
        deleteArticle={deleteArticle}
        isDeleting={isDeleting}
      />

    </div>
  );
}