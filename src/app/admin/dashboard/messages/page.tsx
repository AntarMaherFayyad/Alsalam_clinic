"use client";

import { Card, CardContent } from '@/components/ui/card'
import { MassagesSectionsTableServices, MessageItem } from "@/sections/MassagesSectionsTableServices"
import { useMessages, useMarkAsRead, useDeleteMessage } from '@/components/hooks/useMessages'

export default function MessagesAdminPage() {
  // 1. جلب البيانات واستدعاء الـ mutations
  const { data: messages = [], isLoading, isError, refetch } = useMessages()
  const { mutate: markAsRead } = useMarkAsRead()
  const { mutate: deleteMessage } = useDeleteMessage()

  // 2. حساب الإحصائيات الحية للكروت العليا
  const totalMessages = messages.length
  const unreadCount = messages.filter((m: MessageItem) => !m.is_read).length

  // 3. دالة تحديد تنسيق وحالة الـ Badge بناءً على وضع الرسالة
  const getStatusDetails = (is_read: boolean) => {
    if (!is_read) {
      return { attribute: 'جديدة', className: 'bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/30' }
    }
    return { attribute: 'مقروءة', className: 'bg-emerald-50 border-emerald-100 text-emerald-600 dark:bg-emerald-950/30' }
  }
  if (isLoading) {
    return (
      <div className="space-y-6 p-1 animate-pulse" dir="rtl">
        <div className="h-10 bg-slate-200 rounded-xl w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="h-24 bg-slate-100 rounded-2xl" />
          <div className="h-24 bg-slate-100 rounded-2xl" />
        </div>
        <div className="h-64 bg-slate-100 rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-3" dir="rtl">
        <p className="text-rose-500 font-bold text-sm">حدث خطأ أثناء تحميل صندوق الرسائل.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1 text-right" dir="rtl">

      {/* هيدر الصفحة */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight dark:text-white">صندوق الرسائل</h1>
        <p className="text-slate-500 text-xs sm:text-sm font-light">استعراض وإدارة رسائل التواصل الواردة من مراجعي عيادة السلام</p>
      </div>

      {/* كروت الإحصائيات الحية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/40 rounded-2xl">
          <CardContent className="p-6">
            <p className="text-3xl font-black text-slate-800 font-mono tracking-tight">{totalMessages}</p>
            <p className="text-slate-400 text-xs font-bold mt-1.5 tracking-wide">إجمالي الرسائل الواردة</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/40 rounded-2xl">
          <CardContent className="p-6">
            <p className="text-3xl font-black text-rose-600 font-mono tracking-tight">{unreadCount}</p>
            <p className="text-slate-400 text-xs font-bold mt-1.5 tracking-wide">الرسائل غير المقروءة</p>
          </CardContent>
        </Card>
      </div>

      <MassagesSectionsTableServices
        messages={messages}
        markAsRead={markAsRead}
        deleteMessage={deleteMessage}
        getStatusDetails={getStatusDetails}
      />
    </div>
  )
}