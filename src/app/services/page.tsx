import { getServices } from '@/lib/services';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Services | Ronimation Studios',
    description: 'Explore Ronimation Studios creative services — 3D modeling, character animation, audio scoring, audio restoration, and generative AI production pipelines.',
};

export default async function ServicesPage() {
    const servicesMap = await getServices();
    const services = Object.values(servicesMap);

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-purple-900 selection:text-white flex flex-col">
            <Navbar />

            {/* Studio Ambient Header */}
            <section className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div
                    className="absolute inset-0 opacity-[0.12] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />

                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        Studio Capabilities
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 font-display text-white tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-body leading-relaxed">
                        We merge artistic intuition with technical rigor across 3D visualization, cinematic audio scoring, generative pipelines, and digital media.
                    </p>
                </div>
            </section>

            {/* Services Grid Content */}
            <section className="flex-1 px-4 sm:px-6 pb-24 -mt-10 relative z-20">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {services.map((service, index) => (
                            <MotionWrapper key={service.id} delay={index * 0.08}>
                                <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(46,16,101,0.06)] border border-purple-100 flex flex-col justify-between h-full hover:shadow-[0_25px_60px_rgba(46,16,101,0.12)] hover:-translate-y-1 transition-all duration-300">
                                    <div>
                                        {/* Image Preview */}
                                        <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
                                            <Image
                                                src={service.heroImage || '/portfolio/designs.jpg'}
                                                alt={service.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover pointer-events-none select-none hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full bg-[#1E1B4B]/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide uppercase">
                                                    {service.subtitle}
                                                </span>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl sm:text-3xl font-black font-display text-[#1E1B4B] mb-3">
                                            {service.title}
                                        </h2>
                                        <p className="text-slate-600 font-body text-sm sm:text-base leading-relaxed mb-6">
                                            {service.description}
                                        </p>

                                        {/* Feature Highlights */}
                                        <div className="space-y-3 mb-8">
                                            {service.features.map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100/50">
                                                    <div className="size-8 rounded-lg bg-white text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
                                                        <span className="material-symbols-outlined text-base">
                                                            {feat.icon || 'check_circle'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                                                            {feat.title}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {feat.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors"
                                        >
                                            <span>Detailed Overview</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>

                                        <Link
                                            href="/booking"
                                            className="px-5 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                                        >
                                            Book This Service
                                        </Link>
                                    </div>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="mt-16 bg-gradient-to-r from-[#1E1B4B] to-[#3B0764] rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
                        <div className="max-w-xl">
                            <span className="text-xs uppercase tracking-widest font-bold text-purple-300 font-display">
                                Custom Production Sprints
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black font-display mt-2 mb-3">
                                Need a specialized creative pipeline?
                            </h2>
                            <p className="text-sm sm:text-base text-purple-200 font-body leading-relaxed">
                                We structure bespoke engagements for films, game studios, and agency partners requiring high-fidelity deliverables under tight milestones.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Link
                                href="/booking"
                                className="px-6 py-3.5 rounded-full bg-white text-[#1E1B4B] hover:bg-purple-50 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md"
                            >
                                Schedule Consultation
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider text-center transition-all"
                            >
                                Contact Studio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
