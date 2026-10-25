import { getServices, getServiceBySlug } from '@/lib/services';
import { notFound } from 'next/navigation';
import { SmartLink } from '@/components/ui/SmartLink';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';

export async function generateStaticParams() {
    const services = await getServices();
    return Object.keys(services).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            title: 'Service Not Found | Ronimation',
        };
    }

    return {
        title: `${service.title} | Ronimation`,
        description: service.description.substring(0, 160),
        openGraph: {
            images: [service.heroImage],
        },
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white">
            <Navbar />

            {/* Service Hero */}
            <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden bg-[#1E1B4B]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#1E1B4B]/60 z-10"></div>
                    <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        className="w-full h-full object-cover pointer-events-none select-none"
                        priority
                    />
                </div>

                <div className="relative z-20 text-center max-w-4xl px-4 sm:px-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        Service Discipline
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 font-display text-white tracking-tight">
                        {service.title}
                    </h1>
                    <p className="text-lg sm:text-2xl text-purple-200 font-display font-medium">
                        {service.subtitle}
                    </p>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[960px] mx-auto">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_10px_35px_rgba(46,16,101,0.04)]">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 mb-3 font-display">
                        Overview
                    </h2>
                    <p className="text-slate-700 leading-relaxed text-base sm:text-xl font-normal font-body">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F5F3FF] to-[#FAFAF8] border-y border-purple-100/60">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-purple-700 font-display">
                            Core Pillars
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight mt-1">
                            Key Capabilities
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {service.features.map((feature, i) => (
                            <div key={i} className="bg-white p-7 sm:p-8 rounded-2xl border border-purple-100 shadow-[0_4px_20px_rgba(46,16,101,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative">
                                {feature.link && (
                                    <SmartLink href={feature.link} className="absolute inset-0 z-10">
                                        <span className="sr-only">View {feature.title}</span>
                                    </SmartLink>
                                )}
                                <div className="size-12 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-700 group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-2xl">{feature.icon || 'star'}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-display text-slate-900 group-hover:text-purple-700 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 font-body text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 sm:py-28 text-center px-4 sm:px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-black mb-4 font-display text-slate-900 tracking-tight">
                        Ready to start your production?
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed">
                        Let's discuss how Ronimation Studios can integrate into your workflow.
                    </p>
                    <SmartLink
                        href={service.ctaLink}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#1E1B4B] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-purple-900 hover:scale-105 transition-all"
                    >
                        <span>{service.ctaText}</span>
                        <span className="material-symbols-outlined text-sm ml-2">north_east</span>
                    </SmartLink>
                </div>
            </section>

            <Footer />
        </main>
    );
}
