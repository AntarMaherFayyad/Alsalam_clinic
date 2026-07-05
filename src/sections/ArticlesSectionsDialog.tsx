"use client";

import React, { useState, useRef, useEffect } from 'react'; // تم إضافة useEffect هنا
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Loader2, ImagePlus, Trash2 } from 'lucide-react';
import { UploadArticleImage } from '@/lib/admin/articles'; // الدالة الصحيحة للمقالات
import Image from 'next/image';

const initialFormState = {
    title: '',
    category: '',
    slug: '',
    excerpt: '',
    content: '',
    is_published: true,
    image_url: null as string | null,
};

interface ArticlesSectionsDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    form: {
        title: string;
        category: string;
        slug: string;
        excerpt: string;
        content: string;
        is_published: boolean;
        image_url: string | null;
    };
    setForm: React.Dispatch<React.SetStateAction<any>>;
    editingId: string | null;
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
    createArticle: (data: any, options?: any) => void;
    isCreating: boolean;
    updateArticle: (data: any, options?: any) => void;
    isUpdating: boolean;
}

export function ArticlesSectionsDialog({
    isOpen,
    setIsOpen,
    form,
    setForm,
    editingId,
    setEditingId,
    createArticle,
    isCreating,
    updateArticle,
    isUpdating,
}: ArticlesSectionsDialogProps) {

    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // إضافة الـ State المفقود لمعاينة الصورة
    const fileInputRef = useRef<HTMLInputElement>(null);

    const patch = (field: string, value: any) => {
        setForm((current: any) => ({ ...current, [field]: value }));
    };

    // مزامنة الصورة المقروءة عند فتح المقال للتعديل
    useEffect(() => {
        setPreviewUrl(form.image_url ?? null);
    }, [form.image_url]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const url = await UploadArticleImage(file); // رفع الملف مباشرة أياً كان حجمه
            patch('image_url', url);
            setPreviewUrl(url);
        } catch (err) {
            console.error('فشل رفع الصورة:', err);
            alert('حدث خطأ أثناء رفع الصورة، يرجى المحاولة مرة أخرى.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.preventDefault();
        patch('image_url', null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim() || !form.slug.trim()) return;

        if (editingId) {
            updateArticle(
                { id: editingId, ...form },
                {
                    onSuccess: () => {
                        setIsOpen(false);
                        setForm(initialFormState);
                        setEditingId(null);
                    },
                }
            );
        } else {
            createArticle(form, {
                onSuccess: () => {
                    setIsOpen(false);
                    setForm(initialFormState);
                },
            });
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    setForm(initialFormState);
                    setEditingId(null);
                    setPreviewUrl(null);
                }
            }}
        >
            <DialogTrigger
                nativeButton={false}
                className="inline-flex items-center justify-center bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-5 py-3 shrink-0 text-sm h-12 transition-colors cursor-pointer"
            >
                <Plus className="w-4 h-4" />
                <span>إضافة مقال جديد</span>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 border-slate-100 dark:bg-slate-900 dark:border-slate-800 scrollbar-none">
                <DialogHeader className="text-right">
                    <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                        {editingId ? 'تعديل المقال الطبي' : 'إضافة مقال طبي جديد'}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-xs mt-1">
                        قم بملء تفاصيل المقال بالكامل ليتم تحديث المدونة الطبية العامة فوراً.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-right">

                    {/* 📸 خانة رفع الصورة البارزة كأول حقل بالـ Form */}
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">صورة المقال البارزة</Label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                            id="article-image-upload"
                        />

                        {!previewUrl ? (
                            <label
                                htmlFor="article-image-upload"
                                className={`flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#0b6a6b] rounded-2xl p-6 bg-slate-50/50 cursor-pointer transition-all ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
                            >
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="w-6 h-6 text-[#0b6a6b] animate-spin" />
                                        <span className="text-xs text-slate-500 font-medium">جاري رفع الصورة إلى السيرفر...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-[#0b6a6b]/5 flex items-center justify-center text-[#0b6a6b]">
                                            <ImagePlus className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs text-slate-600 font-bold">اختر صورة من جهازك...</span>
                                        <span className="text-[10px] text-slate-400">التنسيقات المدعومة: JPG, PNG (الحد الأقصى: 2 ميجابايت)</span>
                                    </div>
                                )}
                            </label>
                        ) : (
                            <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm group bg-slate-50">
                                <Image
                                    src={previewUrl}
                                    alt="معاينة المقال"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-3 right-3 bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl shadow-md transition-all z-10"
                                    title="حذف الصورة"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* عنوان المقال الرئيسي */}
                    <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs font-bold text-slate-700 dark:text-slate-300">عنوان المقال الرئيسي</Label>
                        <Input
                            id="title"
                            value={form.title}
                            onChange={(e) => patch('title', e.target.value)}
                            placeholder="مثال: أهمية الفحوصات الدورية لمرضى السكري"
                            className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-[#0b6a6b]"
                            required
                        />
                    </div>

                    {/* التصنيف والـ Slug */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="category" className="text-xs font-bold text-slate-700 dark:text-slate-300">التصنيف</Label>
                            <Input
                                id="category"
                                value={form.category}
                                onChange={(e) => patch('category', e.target.value)}
                                placeholder="مثال: الباطنة والسكري"
                                className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-[#0b6a6b]"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="slug" className="text-xs font-bold text-slate-700 dark:text-slate-300">رابط المقال (Slug)</Label>
                            <Input
                                id="slug"
                                value={form.slug}
                                onChange={(e) => patch('slug', e.target.value.replace(/\s+/g, '-').toLowerCase())}
                                placeholder="diabetes-routine-check"
                                dir="ltr"
                                className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-[#0b6a6b] text-left"
                                required
                            />
                        </div>
                    </div>

                    {/* مقتطف المقال */}
                    <div className="space-y-1.5">
                        <Label htmlFor="excerpt" className="text-xs font-bold text-slate-700 dark:text-slate-300">مقتطف أو نبذة مختصرة</Label>
                        <Textarea
                            id="excerpt"
                            value={form.excerpt}
                            onChange={(e) => patch('excerpt', e.target.value)}
                            placeholder="اكتب ملخصاً قصيراً يظهر في بطاقة المقال الخارجية للمرضى..."
                            className="rounded-xl border-slate-200 focus-visible:ring-[#0b6a6b] min-h-[70px] text-sm resize-none p-3 leading-relaxed"
                            required
                        />
                    </div>

                    {/* المحتوى الطبي بالكامل */}
                    <div className="space-y-1.5">
                        <Label htmlFor="content" className="text-xs font-bold text-slate-700 dark:text-slate-300">المحتوى الطبي بالكامل</Label>
                        <Textarea
                            id="content"
                            value={form.content}
                            onChange={(e) => patch('content', e.target.value)}
                            placeholder="اكتب نص المقال بالكامل هنا بشكل تفصيلي علمي ومنسق..."
                            className="rounded-xl border-slate-200 focus-visible:ring-[#0b6a6b] min-h-[180px] text-sm p-4 leading-relaxed"
                            required
                        />
                    </div>

                    <DialogFooter className="mt-6 pt-2 flex-row-reverse sm:justify-start gap-2">
                        <Button
                            type="submit"
                            disabled={isCreating || isUpdating || isUploading}
                            className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl px-6 h-11 w-full sm:w-auto"
                        >
                            {isCreating || isUpdating ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : editingId ? (
                                'تعديل وحفظ المقال'
                            ) : (
                                'حفظ ونشر المقال'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}