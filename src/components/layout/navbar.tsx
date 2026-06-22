'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { siteSettings } from '@/lib/data'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن الطبيب' },
  { href: '/services', label: 'الخدمات' },
  { href: '/articles', label: 'المقالات' },
  { href: '/team', label: 'فريق العمل' },
  { href: '/contact', label: 'تواصل معنا' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className={cn('text-lg font-bold', scrolled ? 'text-foreground' : 'text-white')}>
              {siteSettings.clinicName}
            </span>
            <span className={cn('text-xs', scrolled ? 'text-muted-foreground' : 'text-white/80')}>
              {siteSettings.doctorName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary',
                    scrolled ? 'text-foreground' : 'text-white hover:bg-white/10 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteSettings.phone}`}
              className={cn(
                'flex items-center justify-center gap-2 text-sm font-medium transition-all px-4 h-11 rounded-xl border',
                scrolled
                  ? 'bg-[#0b6a6b] text-white border-transparent shadow-sm hover:bg-[#095455]'
                  : 'bg-white text-[#0b6a6b] border-transparent shadow-sm hover:bg-slate-50'
              )}
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span className="hidden lg:inline font-semibold whitespace-nowrap">{siteSettings.phone}</span>
            </a>

            <Link href="/booking" className="block">
              <Button
                className={cn(
                  "flex items-center justify-center gap-2 font-semibold transition-all px-4 h-11 rounded-xl border text-sm shadow-sm m-0",
                  scrolled
                    ? 'bg-[#0b6a6b] text-white border-transparent hover:bg-[#095455] hover:text-white'
                    : 'bg-white text-[#0b6a6b] border-transparent hover:bg-slate-50 hover:text-[#0b6a6b]'
                )}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">احجز موعد</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu - تم الإصلاح هنا لإزالة التداخل والتخلص من الـ Hydration Error نهائياً */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                'lg:hidden p-2 rounded-xl transition-all duration-300 flex items-center justify-center h-11 w-11 shadow-sm border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b6a6b]',
                scrolled
                  ? 'bg-white text-[#0b6a6b] hover:bg-slate-50'
                  : 'bg-[#0b6a6b] text-white hover:bg-[#095455]'
              )}
              aria-label="فتح القائمة"
            >
              <Menu className="w-5 h-5 shrink-0" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-80 p-0 border-l border-border bg-white flex flex-col h-full"
              dir="rtl"
            >
              <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <Link href="/" className="flex flex-col" onClick={() => setOpen(false)}>
                  <span className="text-lg font-bold text-slate-900 tracking-tight">{siteSettings.clinicName}</span>
                  <span className="text-xs font-medium text-slate-500 mt-0.5">{siteSettings.doctorName}</span>
                </Link>

                <SheetClose className="h-9 w-9 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none">
                  <X className="w-4 h-4" />
                </SheetClose>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center px-4 py-3.5 rounded-xl text-slate-700 hover:bg-[#0b6a6b]/5 hover:text-[#0b6a6b] font-medium transition-all duration-200 group text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#0b6a6b] ml-2 transition-all duration-200" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-[#0b6a6b]/30 hover:text-[#0b6a6b] transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#0b6a6b]/10 group-hover:text-[#0b6a6b] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide">{siteSettings.phone}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">اتصل الآن</span>
                </a>

                <Link href="/booking" onClick={() => setOpen(false)} className="block w-full">
                  <Button className="w-full gap-2 h-12 bg-[#0b6a6b] text-white hover:bg-[#095455] rounded-xl font-bold shadow-md shadow-[#0b6a6b]/10 transition-all text-sm">
                    <Calendar className="w-4 h-4" />
                    احجز موعدك الآن
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}