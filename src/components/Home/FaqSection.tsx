import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqs } from '@/lib/data'
import { cn } from '@/lib/utils'

export function FaqSection() {
  const sorted = [...faqs].sort((a, b) => a.order - b.order)

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* عناصر جمالية في الخلفية للتناغم البصري */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-slate-50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* هيدر سكشن الأسئلة */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-flex bg-[#0b6a6b]/10 text-[#0b6a6b] px-4 py-1.5 rounded-xl text-xs font-bold mb-4 tracking-wide">
            الأسئلة الشائعة
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            الأسئلة الأكثر شيوعاً واستفساراتكم
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-light">
            جمعنا لكم هنا إجابات وافية لأبرز الأسئلة والاستفسارات الطبية والتنظيمية التي يطرحها مراجعو العيادة.
          </p>
        </div>

        {/* قائمة الأسئلة (Accordion) */}
        <Accordion className="space-y-4">
          {sorted.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className={cn(
                "bg-white border border-slate-100 rounded-2xl px-6 transition-all duration-300 shadow-sm",
                "data-[state=open]:shadow-md data-[state=open]:shadow-slate-100/70 data-[state=open]:border-[#0b6a6b]/20"
              )}
            >
              {/* السؤال */}
              <AccordionTrigger
                className={cn(
                  "text-right font-bold text-slate-800 hover:no-underline py-5 text-sm sm:text-base transition-colors duration-200",
                  "data-[state=open]:text-[#0b6a6b] [&[data-state=open]>svg]:text-[#0b6a6b]"
                )}
              >
                {faq.question}
              </AccordionTrigger>

              {/* الإجابة */}
              <AccordionContent className="text-slate-500 font-light text-sm leading-relaxed pb-5 border-t border-slate-50/60 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  )
}