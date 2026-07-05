"use client";

import { Stethoscope, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MedicalService {
  id: string;
  title: string;
  price: string | number;
  description: string;
}

interface ServicesSectionsTableServicesProps {
  services: MedicalService[];
  setIsOpen: (open: boolean) => void;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteService: (id: string) => void;
  isDeleting: boolean;
}

export function ServicesSectionsTableServices({
  services,
  setIsOpen,
  setForm,
  setEditingId,
  deleteService,
}: ServicesSectionsTableServicesProps) {

  const handleEditClick = (service: MedicalService) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      price: service.price || '',
      description: service.description || '',
    });
    setIsOpen(true);
  };



  const handleDeleteClick = (id: string) => {
    deleteService(id)
  }



  return (
    <Card className="border-slate-200/60 bg-white shadow-sm rounded-2xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 dark:bg-slate-800/40 dark:border-slate-800 text-right">
        <CardTitle className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
          <Stethoscope className="w-4 h-4 text-[#0b6a6b]" />
          <span>قائمة الخدمات الحالية</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400 font-medium">لا توجد خدمات مضافة حالياً.</div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-200/50 hover:border-[#0b6a6b]/20 hover:shadow-md hover:bg-white dark:bg-slate-900/40 dark:border-slate-800 dark:hover:bg-slate-900 transition-all duration-300 text-right"
              >
                {/* أيقونة وتفاصيل الخدمة الطبية */}
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-[#0b6a6b]/10 border border-[#0b6a6b]/5 flex items-center justify-center shrink-0 text-[#0b6a6b] dark:bg-[#0b6a6b]/20">
                    <Stethoscope className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-800 text-xs sm:text-sm truncate dark:text-white">{service.title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal opacity-90 line-clamp-2 sm:line-clamp-1 dark:text-slate-400">{service.description}</p>
                  </div>
                </div>

                {/* شريط السعر وأدوات الإدارة والـ Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 dark:border-slate-800 justify-end">

                  {/* كرت السعر النقي */}
                  {service.price && (
                    <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-xl px-4 py-1.5 text-center shadow-sm flex items-baseline justify-center gap-1">
                      <span className="text-base sm:text-lg font-black text-[#0b6a6b] dark:text-teal-400 font-mono">{service.price}</span>
                      <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold">ج.م</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleEditClick(service)}
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white shadow-sm"
                      title="تعديل الخدمة"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>

                    <Button
                      onClick={() => handleDeleteClick(service.id)}
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-700 text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 dark:hover:bg-rose-950/30 shadow-sm"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}