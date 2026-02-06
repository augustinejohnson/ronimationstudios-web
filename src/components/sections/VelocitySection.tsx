'use client';

import { useState } from 'react';
import { SmartLink } from '@/components/ui/SmartLink';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type FeatureBarProps = {
    title: string;
    icon: string;
    status: string;
    colorClass: string; // e.g., 'secondary', 'primary'
    children: React.ReactNode;
};

const FeatureBar = ({ title, icon, status, colorClass, children }: FeatureBarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Mapping simple color names to Tailwind classes (simplified for this context)
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'secondary': return 'bg-secondary text-secondary group-hover:text-secondary group-hover:border-secondary';
            case 'primary': return 'bg-primary text-primary group-hover:text-primary group-hover:border-primary';
            case 'purple': return 'bg-purple-500 text-purple-500 group-hover:text-purple-500 group-hover:border-purple-500';
            case 'pink': return 'bg-pink-500 text-pink-500 group-hover:text-pink-500 group-hover:border-pink-500';
            default: return 'bg-white text-white group-hover:text-white group-hover:border-white';
        }
    };

    const activeColor = getColorClasses(colorClass);

    return (
        <div className="group relative bg-[#1c1c21] hover:bg-[#232329] border border-white/5 rounded-xl overflow-hidden transition-all duration-300">
            {/* Glow Bar */}
            <div className={twMerge("absolute top-0 left-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity", activeColor.split(' ')[0])}></div>

            {/* Header (Clickable) */}
            <div
                className="flex items-center justify-between p-4 sm:p-6 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <span className={twMerge("material-symbols-outlined text-gray-500 transition-colors", activeColor.split(' ')[2])}>{icon}</span>
                    <h3 className="text-lg md:text-xl font-bold text-white font-display">{title}</h3>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 font-mono hidden sm:block uppercase">{status}</span>
                    <div className={twMerge(
                        "w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all",
                        isOpen ? activeColor.split(' ')[0] + " text-black" : "group-hover:bg-white/5"
                    )}>
                        <span className="material-symbols-outlined text-sm transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>add</span>
                    </div>
                </div>
            </div>

            {/* Content (Accordion) */}
            <div className={twMerge(
                "grid transition-all duration-300 ease-in-out px-4 sm:px-6",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden">
                    <div className="pt-2 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2 font-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const VelocitySection = () => {
    return (
        <section id="velocity" className="py-24 bg-[#131318] border-y border-white/5 relative overflow-hidden">

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "linear-gradient(to bottom, transparent, black, transparent)" }}></div>

            <div className="layout-container max-w-[960px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-3 py-1 rounded text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20">SYSTEM_VERSION: 2.0</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Introducing Ronimation Velocity™</h2>
                    <p className="text-gray-400 max-w-lg mx-auto font-body">Our proprietary AI-enhanced workflow engine designed to accelerate creative output without compromising soul.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <FeatureBar title="Generative AI Video" icon="auto_awesome" status="Rendering..." colorClass="secondary">
                        We leverage state-of-the-art diffusion models to generate high-fidelity video content.
                        From script to screen, our AI workflows accelerate production by 10x while maintaining artistic control.
                        <br /><br />
                        <SmartLink href="/services/gen-ai" className="text-secondary hover:underline">Read Documentation →</SmartLink>
                    </FeatureBar>

                    <FeatureBar title="AI-Enhanced Editing" icon="content_cut" status="Optimized" colorClass="primary">
                        Automated scene detection, smart cropping, and pacing analysis. Our tools assist editors by handling the repetitive tasks, leaving purely creative decisions to humans.
                    </FeatureBar>

                    <FeatureBar title="Audio Restoration" icon="graphic_eq" status="Denoising" colorClass="purple">
                        Revive archival footage with our neural network-based audio restoration pipeline.
                        Denoising, dereverberation, and spectral repair.
                        <br /><br />
                        <SmartLink href="/services/audio-restoration" className="text-purple-500 hover:underline">View Case Studies →</SmartLink>
                    </FeatureBar>

                    <FeatureBar title="Data-Driven Creativity" icon="data_object" status="Analytics" colorClass="pink">
                        Real-time audience engagement metrics fed back into the creative process to optimize content performance across platforms.
                    </FeatureBar>
                </div>
            </div>
        </section>
    );
};
