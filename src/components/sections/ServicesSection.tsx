'use client';

import { SmartLink } from '@/components/ui/SmartLink';
import { ServiceContent } from '@/lib/services';
import { siteRoutes } from '@/config/siteRoutes';

// Helper to map DB services to visual styles based on ID or index
// Since DB doesn't store UI-specifics like gradients/icons in the root model yet
const getServiceVisuals = (id: string, index: number) => {
    const visuals = [
        {
            icon: 'graphic_eq',
            colorClass: 'text-primary',
            blurClass: 'bg-primary/20 group-hover:bg-primary/30',
            borderClass: 'hover:border-primary/30',
            bgPosition: '-right-10 -top-10',
            gradientFrom: 'from-gray-800',
        },
        {
            icon: 'movie_filter',
            colorClass: 'text-secondary',
            blurClass: 'bg-secondary/10 group-hover:bg-secondary/20',
            borderClass: 'hover:border-secondary/30',
            bgPosition: '-left-10 -bottom-10',
            gradientFrom: 'from-gray-800',
        },
        {
            icon: 'fingerprint',
            colorClass: 'text-white',
            blurClass: 'bg-gradient-to-r from-primary/10 to-secondary/10', // Special case for 3rd card
            borderClass: 'hover:border-white/20',
            bgPosition: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full', // Full fill
            gradientFrom: 'from-gray-800',
        }
    ];

    return visuals[index % visuals.length];
};

export const ServicesSection = ({ services }: { services: ServiceContent[] }) => {
    // Sort or filter services if needed. For now, we take the first 3 or all.
    const displayServices = services.length > 0 ? services : [];

    return (
        <section id="services" className="py-24 bg-[#FAFAF8] relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-primary text-sm font-bold uppercase tracking-widest mb-2 font-display">Our Services</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight font-display mb-6">Crafting the Future of Media</h3>
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-body">
                            We blend artistic intuition with cutting-edge technology across three core pillars.
                        </p>
                    </div>
                </div>

                {/* Dynamic Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {displayServices.map((service, index) => {
                        const style = getServiceVisuals(service.id, index);

                        return (
                            <div key={service.id} className={`group bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${style.borderClass} min-h-[400px]`}>
                                {/* Decorative Blur/Gradient */}
                                <div className={`absolute ${style.bgPosition} ${index === 2 ? '' : 'w-40 h-40 rounded-full blur-[50px]'} ${style.blurClass} transition-all`}></div>

                                <div className="relative z-10">
                                    <div className={`size-12 rounded-full bg-white/10 flex items-center justify-center mb-6 ${style.colorClass} group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{style.icon}</span>
                                    </div>
                                    <h4 className="text-2xl font-bold text-[#1a1a2e] mb-2 font-display">{service.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed font-body">{service.description}</p>
                                </div>

                                <div className="relative z-10 pt-8">
                                    <SmartLink href={`/services/${service.id}`} className="inline-flex items-center text-sm font-bold text-[#1a1a2e] hover:text-primary transition-colors">
                                        {service.ctaText || 'Learn More'} <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </SmartLink>
                                </div>

                                <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay group-hover:opacity-20 transition-opacity"
                                    style={{ backgroundImage: `url('${service.heroImage}')` }}>
                                </div>
                            </div>
                        );
                    })}

                    {displayServices.length === 0 && (
                        <div className="col-span-3 text-center text-gray-400 py-10">
                            No services found. Please add services in the Admin Dashboard.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
