import type { Metadata, Viewport } from 'next'
import { Tajawal } from 'next/font/google'
import "./globals.css";


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
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar" dir="rtl" className={`bg-background ${tajawal.variable}`}
    >
      <body className="font-sans antialiased">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
