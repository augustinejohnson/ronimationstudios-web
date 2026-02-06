import { getServices, getServiceBySlug } from '@/lib/services';
import { notFound } from 'next/navigation';
import { SmartLink } from '@/components/ui/SmartLink';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';

// Generate static params for all known services
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
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Service Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <Image
                        src={service.heroImage}
                        alt={service.title}
                        fill
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>

                <MotionWrapper className="relative z-20 text-center max-w-4xl px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-display text-white">{service.title}</h1>
                    <p className="text-xl md:text-2xl text-secondary font-mono">{service.subtitle}</p>
                </MotionWrapper>
            </section>

            {/* Overview */}
            <section className="py-24 px-6 max-w-[960px] mx-auto">
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-gray-300 leading-relaxed text-xl font-light">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-surface-dark border-y border-white/5">
                <MotionWrapper className="max-w-[1280px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 font-display">Key Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {service.features.map((feature, i) => (
                            <div key={i} className="glass-panel p-8 rounded-xl hover:border-primary/50 transition-colors group relative">
                                {feature.link && (
                                    <SmartLink href={feature.link} className='absolute inset-0 z-10'>
                                        <span className="sr-only">View {feature.title}</span>
                                    </SmartLink>
                                )}
                                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">{feature.icon || 'star'}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                                <p className="text-gray-400 font-body text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </MotionWrapper>
            </section>

            {/* CTA */}
            <section className="py-32 text-center px-6">
                <h2 className="text-3xl font-bold mb-8 font-display">Ready to create?</h2>
                <SmartLink
                    href={service.ctaLink}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                >
                    {service.ctaText}
                </SmartLink>
            </section>

            <Footer />
        </main>
    );
}
