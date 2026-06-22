import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { siteSettings } from '@/lib/data'

// Inline SVG social icons
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const footerLinks = {
  pages: [
    { href: '/', label: 'الرئيسية' },
    { href: '/about', label: 'عن الطبيب' },
    { href: '/services', label: 'الخدمات' },
    { href: '/articles', label: 'المقالات' },
    { href: '/team', label: 'فريق العمل' },
    { href: '/contact', label: 'تواصل معنا' },
  ],
  services: [
    { href: '/services', label: 'الكشف العام' },
    { href: '/services', label: 'متابعة الأمراض المزمنة' },
    { href: '/services', label: 'الاستشارات الطبية' },
    { href: '/services', label: 'التحاليل المخبرية' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#094e50] text-sidebar-foreground border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">{siteSettings.clinicName}</h3>
              <p className="text-xs text-white/60 mt-1 font-medium">{siteSettings.doctorName}</p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              نقدم رعاية طبية متكاملة واحترافية بأعلى المعايير لضمان صحة مرضانا وسلامتهم، مستعينين بأحدث التقنيات الطبية.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-2">
              {siteSettings.facebook && (
                <a href={siteSettings.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#0b6a6b] hover:scale-110 hover:shadow-lg transition-all duration-300" aria-label="فيسبوك">
                  <IconFacebook />
                </a>
              )}
              {siteSettings.instagram && (
                <a href={siteSettings.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#0b6a6b] hover:scale-110 hover:shadow-lg transition-all duration-300" aria-label="إنستجرام">
                  <IconInstagram />
                </a>
              )}
              {siteSettings.youtube && (
                <a href={siteSettings.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#0b6a6b] hover:scale-110 hover:shadow-lg transition-all duration-300" aria-label="يوتيوب">
                  <IconYoutube />
                </a>
              )}
              {siteSettings.linkedin && (
                <a href={siteSettings.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#0b6a6b] hover:scale-110 hover:shadow-lg transition-all duration-300" aria-label="لينكدإن">
                  <IconLinkedin />
                </a>
              )}
            </div>
          </div>

          {/* Pages Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-white/30">
              صفحات الموقع
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.pages.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}
                    className="text-white/70 hover:text-white transition-all text-sm flex items-center group hover:translate-x-[-4px] duration-200">
                    <span className="w-1 h-1 rounded-full bg-white/30 ml-2 group-hover:bg-white transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-white/30">
              خدماتنا
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <Link href={link.href}
                    className="text-white/70 hover:text-white transition-all text-sm flex items-center group hover:translate-x-[-4px] duration-200">
                    <span className="w-1 h-1 rounded-full bg-white/30 ml-2 group-hover:bg-white transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-white text-base mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-white/30">
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${siteSettings.phone}`}
                  className="flex items-center gap-3.5 text-white/70 hover:text-white transition-all text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all shrink-0">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span dir="ltr" className="font-semibold tracking-wider">{siteSettings.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-3.5 text-white/70 hover:text-white transition-all text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all shrink-0">
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="truncate">{siteSettings.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3.5 text-white/70 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 mt-0.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="leading-relaxed pt-0.5">{siteSettings.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()} {siteSettings.clinicName} - جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/50 hover:text-white text-xs font-medium transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-xs font-medium transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}