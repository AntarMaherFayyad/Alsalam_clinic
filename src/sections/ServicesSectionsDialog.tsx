'use client';
import { useState, useEffect } from 'react';
import { UploadServiceImage } from '@/lib/admin/services';
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
import { Plus, Loader2, Upload, X } from 'lucide-react';

interface ServicesSectionsDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    form: {
        title: string;
        price: string | number;
        description: string;
        image_url: string | null;
    };
    setForm: React.Dispatch<React.SetStateAction<any>>;
    editingId: string | null;
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
    createService: (data: any, options?: any) => void;
    isCreating: boolean;
    updateService: (data: any, options?: any) => void;
    isUpdating: boolean;
    initialFormState: any;
}

export function ServicesSectionsDialog({
    isOpen,
    setIsOpen,
    form,
    setForm,
    editingId,
    setEditingId,
    createService,
    isCreating,
    updateService,
    isUpdating,
    initialFormState,
}: ServicesSectionsDialogProps) {
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const patch = (field: string, value: any) => {
        setForm((current: any) => ({ ...current, [field]: value }));
    };
    useEffect(() => {
        setPreviewUrl(form.image_url ?? null);
    }, [form.image_url]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return;

        if (editingId) {
            updateService(
                { id: editingId, ...form },
                {
                    onSuccess: () => {
                        setIsOpen(false);
                        setForm(initialFormState);
                        setEditingId(null);
                    },
                },
            );
        } else {
            createService(form, {
                onSuccess: () => {
                    setIsOpen(false);
                    setForm(initialFormState);
                },
            });
        }
    };
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await UploadServiceImage(file);
            patch('image_url', url);
            setPreviewUrl(url);
        } catch (err) {
            console.error('فشل رفع الصورة:', err);
        } finally {
            setUploading(false);
        }
    };
    const handleRemoveImage = () => {
        patch('image_url', null);
        setPreviewUrl(null);
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={(open) => {
                    setIsOpen(open);
                    if (!open) {
                        setForm(initialFormState);
                        setEditingId(null);
                    }
                }}
            >
                <DialogTrigger
                    render={
                        <Button className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl gap-2 shadow-sm px-5 py-6 shrink-0">
                            <Plus className="w-4 h-4" />
                            <span>إضافة خدمة جديدة</span>
                        </Button>
                    }
                />
                <DialogContent className="sm:max-w-[480px] rounded-2xl bg-white p-6 border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                    <DialogHeader className="text-right">
                        <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white">
                            {editingId ? 'تعديل الخدمة الطبية' : 'إضافة خدمة طبية جديدة'}
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-xs mt-1">
                            قم بملء البيانات التالية ليتم إدراج الخدمة وسعرها في حجز المواعيد
                            والصفحة العامة.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-right">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                صورة الخدمة
                            </Label>
                            {previewUrl ? (
                                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200">
                                    <img
                                        src={previewUrl}
                                        alt="صورة الخدمة"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-[#0b6a6b]/40 hover:bg-slate-50 transition-all">
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 animate-spin text-[#0b6a6b]" />
                                    ) : (
                                        <>
                                            <Upload className="w-6 h-6 text-slate-400 mb-2" />
                                            <span className="text-xs text-slate-400 font-medium">
                                                اضغط لرفع صورة
                                            </span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                </label>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="service-title"
                                className="text-xs font-bold text-slate-700 dark:text-slate-300"
                            >
                                اسم الخدمة / الإجراء الطبي
                            </Label>
                            <Input
                                id="service-title"
                                value={form.title || ''}
                                onChange={(e) => patch('title', e.target.value)}
                                placeholder="مثال: كشف استشاري قلب وأوعية دموية"
                                className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-[#0b6a6b]"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="price"
                                className="text-xs font-bold text-slate-700 dark:text-slate-300"
                            >
                                تكلفة الخدمة (ج.م)
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={form.price || ''}
                                onChange={(e) => patch('price', e.target.value)}
                                placeholder="مثال: 500"
                                className="rounded-xl border-slate-200 h-11 text-sm focus-visible:ring-[#0b6a6b]"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="description"
                                className="text-xs font-bold text-slate-700 dark:text-slate-300"
                            >
                                وصف مختصر للخدمة
                            </Label>
                            <Textarea
                                id="description"
                                value={form.description || ''}
                                onChange={(e) => patch('description', e.target.value)}
                                placeholder="تشمل رسم القلب الافتراضي والمتابعة الطبية المجانية لمدة أسبوع..."
                                className="rounded-xl border-slate-200 focus-visible:ring-[#0b6a6b] min-h-[90px] text-sm resize-none p-3 leading-relaxed"
                                required
                            />
                        </div>

                        <DialogFooter className="mt-6 pt-2 flex-row-reverse sm:justify-start gap-2">
                            <Button
                                type="submit"
                                disabled={isCreating || isUpdating}
                                className="bg-[#0b6a6b] hover:bg-[#0b6a6b]/90 text-white font-bold rounded-xl px-5 h-11 w-full sm:w-auto"
                            >
                                {isCreating || isUpdating ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : editingId ? (
                                    'تعديل وحفظ الخدمة'
                                ) : (
                                    'حفظ وإضافة الخدمة'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
