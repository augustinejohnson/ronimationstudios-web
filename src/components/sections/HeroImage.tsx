'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SmartLink } from '@/components/ui/SmartLink';
import { Modal } from '@/components/ui/Modal';
import { siteRoutes } from '@/config/siteRoutes';

export const HeroImage = () => {
    const [showreelOpen, setShowreelOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background-dark text-white">

            {/* Image Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-black/60 z-10"></div> {/* Overlay */}
                {/* Replace src with your desired image path */}
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/g4mg-adamz-pharmacy.firebasestorage.app/o/Adamz%2FRonimation%20studios%2FRonimation%20Studios.png?alt=media&token=6931bbed-f777-4c73-b1d1-0f2259cd151e"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center justify-center gap-12 text-center h-full">

                <div className="flex flex-col items-center max-w-5xl">


                    <p className="max-w-xl text-lg md:text-xl text-gray-400 font-light leading-relaxed font-body mb-10">
                        Where technology meets creativity. We are redefining the African multimedia landscape through high-fidelity audio, immersive visuals, and generative AI.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <SmartLink
                            href={siteRoutes.hero.primaryCta}
                            className="flex items-center justify-center h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(138,44,226,0.5)] hover:shadow-[0_0_30px_rgba(138,44,226,0.7)]"
                        >
                            Explore Services
                        </SmartLink>

                        <button
                            onClick={() => setShowreelOpen(true)}
                            className="flex items-center justify-center h-12 px-8 rounded-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium transition-all group"
                        >
                            View Showreel
                            <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">play_arrow</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 animate-bounce">
                <span className="text-xs uppercase tracking-widest text-gray-500">Scroll to Explore</span>
                <span className="material-symbols-outlined text-primary">keyboard_arrow_down</span>
            </div>

            {/* Showreel Modal */}
            <Modal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)}>
                <iframe
                    width="100%"
                    height="100%"
                    src={siteRoutes.hero.showreel}
                    title="Ronimation Showreel"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </Modal>
        </section>
    );
};
