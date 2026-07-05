import type { Metadata, Viewport } from 'next'
import { Tajawal, Geist } from 'next/font/google'
import "./globals.css";
import Providers from './providers'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const tajawal = Tajawal({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '500', '700', '800'],
    variable: '--font-tajawal',
    display: 'swap',
})
export const metadata: Metadata = {
    title: 'د. أحمد السالم - استشاري الباطنة والأمراض المزمنة',
    description: 'موقع الدكتور أحمد السالم - استشاري أمراض الباطنة والأمراض المزمنة. احجز موعدك الآن واستفد من أفضل الخدمات الطبية المتخصصة.',
    keywords: 'طبيب, دكتور, عيادة, حجز موعد, باطنة, أمراض مزمنة, استشاري',
    robots: 'index, follow',
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ar"
            dir="rtl"
            className={cn("bg-background", tajawal.variable, "font-sans", geist.variable)}
            suppressHydrationWarning   
        >
            <body className="font-sans antialiased">
                <Providers>
                {children}
                </Providers>
            </body>
        </html>
    );
}
