"use client";

import { useState } from 'react';
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService
} from '@/components/hooks/useServices'

import { ServicesSectionsDialog } from '@/sections/ServicesSectionsDialog'
import { ServicesSectionsStatisticalCards } from '@/sections/ServicesSectionsStatisticalCards';
import { ServicesSectionsTableServices } from '@/sections/ServicesSectionsTableServices';

const initialFormState = {
  title: '',
  price: '',
  description: '',
  visible: true,
  image_url: null as string | null,
};

export default function ServicesAdminPage() {
  const { data: services = [], isLoading, isError } = useServices();

  const [form, setForm] = useState(initialFormState);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { mutate: createService, isPending: isCreating } = useCreateService();
  const updateServiceMutation = useUpdateService()
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();

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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight dark:text-white">إدارة الخدمات</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">إضافة وتعديل الخدمات الطبية والتحاليل المعروضة للمرضى على الواجهة</p>
        </div>

        <ServicesSectionsDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          form={form}
          setForm={setForm}
          editingId={editingId}
          setEditingId={setEditingId}
          createService={createService}
          isCreating={isCreating}
          updateService={updateServiceMutation.mutate}
          isUpdating={updateServiceMutation.isPending}
          initialFormState={initialFormState}
        />
      </div>

      <ServicesSectionsStatisticalCards services={services} />

      <ServicesSectionsTableServices
        services={services}
        setIsOpen={setIsOpen}
        setForm={setForm}
        setEditingId={setEditingId}
        deleteService={deleteService}
        isDeleting={isDeleting}
      />

    </div>
  );
}