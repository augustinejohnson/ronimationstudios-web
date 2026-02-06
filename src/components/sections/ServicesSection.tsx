'use client';

import { SmartLink } from '@/components/ui/SmartLink';
import { siteRoutes } from '@/config/siteRoutes';

export const ServicesSection = () => {
    return (
        <section id="services" className="py-24 bg-background-dark relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="max-w-[1280px] mx-auto px-6 relative z-10">

                {/* Header */}
                {/* Header */}
                <div className="flex flex-col mb-16">
                    <div className="max-w-3xl">
                        <h2 className="text-secondary text-sm font-bold uppercase tracking-widest mb-2 font-display">Our Services</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display mb-6">Crafting the Future of Media</h3>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-body">
                            We blend artistic intuition with cutting-edge technology across three core pillars.
                        </p>
                    </div>
                </div>

                {/* Bento Grid converted to Uniform 3-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">

                    {/* Card 1: Audio */}
                    <div className="group glass-panel rounded-lg p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 min-h-[400px]">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-all"></div>
                        <div className="relative z-10">
                            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">graphic_eq</span>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2 font-display">Audio & Music</h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">High-fidelity sound engineering, spatial audio mixing, and sonic branding for the next generation of artists.</p>
                        </div>

                        <div className="relative z-10 pt-8">
                            <SmartLink href={siteRoutes.services[0].routePath} className="inline-flex items-center text-sm font-bold text-white hover:text-secondary transition-colors">
                                Learn More <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </SmartLink>
                        </div>

                        <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay group-hover:opacity-20 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1t5OqG_Vux0XS4UD6ZvdfEJ3WWenWXhJ-CXo8owEQRjxJnj65w0pAr95cGUSek7QBa8pJ8HFPBkDOXEp5p7lPhAu-dgJz4VFeI-v4uyqlcTFdmHuK_90nmK_GGq6NFVcYITuy4kWxCKGHAMvGmJlU_auAhxvaprWgeegIuy9dqScAmwnTYQhAVFLnaNzfYXOfDEmUX_yrix9rAouV0KaOGi85esLjhN6QRWOnZDBP-eaZEBdVjgy-Nn4DW_w8ZRTWy7nP81QRRfI')" }}></div>
                    </div>

                    {/* Card 2: Video */}
                    <div className="group glass-panel rounded-lg p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-secondary/30 min-h-[400px]">
                        <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all"></div>
                        <div className="relative z-10">
                            <div className="size-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">movie_filter</span>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2 font-display">Video & Animation</h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">From motion graphics to 3D character animation. We create visual narratives that stick.</p>
                        </div>

                        <div className="relative z-10 pt-8">
                            <SmartLink href={siteRoutes.services[1].routePath} className="inline-flex items-center text-sm font-bold text-white hover:text-secondary transition-colors">
                                View Portfolio <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </SmartLink>
                        </div>

                        <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay group-hover:opacity-20 transition-opacity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLISvCb7LSMmSZmPVbsoJa5zYmqGjnbxsqFHmVhz8Cz0KHBWzL_YamnvGq3_nNkPkK5eL9cwiGFu7tkVgGvMs3ssbEtEV8pf_OJuWOGAFZcKWZUXNS7Vs55MUvjfq08m1YYN_zzCRxh30gZf6NRARgPmnk6tnQHEM270T9YgqC2FMl_JXejF8deHe31-b-zNys4TVmQ2pxQIbq2P3nIPircv6M9LiLhF-eoD8SKTl4-I2bG1lodztgpvBbaBlv1kfQUPFciGQHJeI')" }}></div>
                    </div>

                    {/* Card 3: Interactive Tech */}
                    <div className="group glass-panel rounded-lg p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-white/20 min-h-[400px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="size-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl text-white">fingerprint</span>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2 font-display">Branding & Tech</h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">Immersive digital experiences, XR solutions, and interactive web designs.</p>
                        </div>

                        <div className="relative z-10 pt-8">
                            <SmartLink href={siteRoutes.services[2].routePath} className="inline-flex items-center text-sm font-bold text-white hover:text-secondary transition-colors">
                                Discover Tech <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </SmartLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
