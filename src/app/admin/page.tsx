// import { checkAdminSession } from '@/lib/admin-auth'
import Link from 'next/link'
// import { redirect } from 'next/navigation'
import { AdminLoginForm } from '@/components/admin/admin-login-form'
// import { siteSettings } from '@/lib/data'
import { Shield } from 'lucide-react'
import { GetAppointments } from '@/lib/admin/appointments'
import { GetMessages } from '@/lib/admin/messages'
import { GetArticles } from '@/lib/admin/articles'
import { GetServices } from '@/lib/admin/services'

export default async function AdminDashboardPage() {
    const [appointments, messages, articles, services] = await Promise.all([
        GetAppointments(),
        GetMessages(),
        GetArticles(),
        GetServices(),
    ])

    const pendingCount = appointments.filter(a => a.status === 'pending').length
    const confirmedCount = appointments.filter(a => a.status === 'confirmed').length
    const unreadMessages = messages.filter(m => !m.is_read).length
    const publishedArticles = articles.filter(a => a.is_published).length
    const activeServices = services.filter(s => s.visible).length

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card rounded-3xl border border-border shadow-xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Shield className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">لوحة تحكم المشرف</h1>
                    </div>

                    <AdminLoginForm />

                    <p className="text-center text-xs text-muted-foreground mt-6">
                        للعودة إلى الموقع{' '}
                        <Link href="/" className="text-primary hover:underline">
                            اضغط هنا
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
