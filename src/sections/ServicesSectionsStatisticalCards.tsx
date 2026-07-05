"use client";
import { Card, CardContent } from '@/components/ui/card';
interface MedicalService {
  id: string;
  title: string;
  price: string | number;
  description: string;
}

interface ServicesSectionsStatisticalCardsProps {
  services?: MedicalService[]
}

export function ServicesSectionsStatisticalCards({
  services = []
}: ServicesSectionsStatisticalCardsProps) {

  const safeServices = Array.isArray(services) ? services : [];

  const totalServicesCount = safeServices.length;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

      <Card className="border-slate-200/60 bg-white shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="p-6 text-right">
          <p className="text-3xl font-black text-slate-800 dark:text-white font-mono tracking-tight">
            {totalServicesCount}
          </p>
          <p className="text-slate-400 text-xs font-bold mt-1.5 tracking-wide">إجمالي الخدمات المدرجة</p>
        </CardContent>
      </Card>
    </div>
  );
}