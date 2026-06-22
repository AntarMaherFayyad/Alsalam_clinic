import { GraduationCap } from 'lucide-react'
import { doctor } from '@/lib/data'
export function Education() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-foreground text-balance mb-4">المؤهلات العلمية</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        مسيرة علمية حافلة من أعرق الجامعات المحلية والدولية
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        <div className="absolute right-5 top-0 bottom-0 w-0.5 bg-border" />
                        <div className="space-y-8">
                            {doctor.education.map((edu, i) => (
                                <div key={i} className="flex gap-6 relative">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 z-10 shadow-md">
                                        <GraduationCap className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="bg-card rounded-2xl border border-border p-6 flex-1 shadow-sm">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-bold text-foreground mb-1">{edu.degree}</h3>
                                                <p className="text-muted-foreground text-sm">{edu.university}</p>
                                            </div>
                                            <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-lg shrink-0">
                                                {edu.year}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}