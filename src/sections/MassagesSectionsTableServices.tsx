import { MessageSquare, Phone, Mail, Reply, Trash2, Check, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// 1. تعريف واجهة بيانات الرسالة الحقيقية والمتناسقة مع قاعدة البيانات
export interface MessageItem {
    id: string;
    full_name: string;    // ← غير من name
    phone: string;
    email: string | null;
    subject: string;
    message: string;
    is_read: boolean;     // ← غير من status
    created_at: string;
}

interface MassagesSectionsTableServicesProps {
    messages: MessageItem[];
    getStatusDetails: (is_read: boolean) => { attribute: string; className: string };
    deleteMessage: (id: string) => void;
    markAsRead: (id: string) => void;  // ← بس id
}
export function MassagesSectionsTableServices({
    messages,
    getStatusDetails,
    deleteMessage,
    markAsRead
}: MassagesSectionsTableServicesProps) {

    return (
        <Card className="border-slate-100 bg-white shadow-xl shadow-slate-100/40 rounded-2xl overflow-hidden" dir="rtl">
            <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
                <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#0b6a6b]" />
                    <span>الوارد الحالي</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                {messages.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 border border-dashed border-slate-100 rounded-2xl">
                        <p className="text-sm font-medium">صندوق الرسائل فارغ تماماً حالياً</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {messages.map((msg: MessageItem) => {
                            const isUnread = !msg.is_read
                            const status = getStatusDetails(msg.is_read)

                            return (
                                <div
                                    key={msg.id}
                                    className={`p-5 rounded-2xl border transition-all duration-300 text-right ${isUnread
                                        ? 'bg-[#0b6a6b]/5 border-[#0b6a6b]/10 shadow-sm shadow-[#0b6a6b]/5'
                                        : 'bg-white border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3.5">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border font-bold text-sm ${isUnread
                                                ? 'bg-[#0b6a6b]/10 text-[#0b6a6b] border-[#0b6a6b]/10'
                                                : 'bg-slate-50 text-slate-600 border-slate-200/60'
                                                }`}>
                                                {msg.full_name ? msg.full_name.charAt(0) : 'م'}
                                            </div>
                                            <div className="min-w-0 text-right">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{msg.full_name}</p>
                                                    {isUnread && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0b6a6b] animate-pulse shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-slate-400 font-mono text-[10px] mt-0.5">
                                                    {msg.created_at ? new Date(msg.created_at).toLocaleString('ar-EG') : ''}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-start sm:self-center shrink-0 flex-row-reverse">
                                            <Badge variant="outline" className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-lg border ${status.className}`}>
                                                {status.attribute}
                                            </Badge>

                                            {isUnread && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => markAsRead(msg.id)}
                                                    className="h-8 w-8 rounded-xl border-slate-200 text-slate-500 hover:bg-white hover:text-slate-800"
                                                    title="تحديد كمقروء"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                </Button>
                                            )}


                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => markAsRead(msg.id)}
                                                className="h-8 w-8 rounded-xl border-slate-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200"
                                                title="تم الرد"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </Button>


                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    if (confirm('هل أنت متأكد من حذف هذه الرسالة نهائياً؟')) {
                                                        deleteMessage(msg.id)
                                                    }
                                                }}
                                                className="h-8 w-8 rounded-xl border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600"
                                                title="حذف الرسالة"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* نص وموضوع الرسالة */}
                                    <div className="mb-4 bg-white/60 p-3.5 rounded-xl border border-slate-100/40 text-right">
                                        <p className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{msg.subject}</p>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light whitespace-pre-line">{msg.message}</p>
                                    </div>

                                    {/* بيانات الاتصال وزر الرد عبر الإيميل خارجياً */}
                                    <div className="flex items-center gap-4 flex-wrap pt-3.5 border-t border-slate-100 flex-row-reverse">
                                        <a
                                            href={`tel:${msg.phone}`}
                                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0b6a6b] transition-colors"
                                        >
                                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                                            <span dir="ltr">{msg.phone}</span>
                                        </a>

                                        {msg.email && (
                                            <a
                                                href={`mailto:${msg.email}`}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0b6a6b] transition-colors min-w-0"
                                            >
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="truncate">{msg.email}</span>
                                            </a>
                                        )}

                                        {msg.email && (
                                            <a
                                                href={`mailto:${msg.email}?subject=رد على: ${msg.subject}`}
                                                onClick={() => markAsRead(msg.id)}
                                                className="ml-auto flex items-center gap-2 text-xs bg-[#0b6a6b] text-white px-3.5 py-2 rounded-xl hover:bg-[#0b6a6b]/90 transition-all shadow-sm font-bold active:scale-95 flex-row-reverse"
                                            >
                                                <Reply className="w-3.5 h-3.5" />
                                                <span>رد عبر البريد</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}