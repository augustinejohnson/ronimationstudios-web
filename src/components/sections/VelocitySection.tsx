'use client';

import { useState } from 'react';
import { SmartLink } from '@/components/ui/SmartLink';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceContent } from '@/lib/services'; // Ensure this type is available

type FeatureBarProps = {
    title: string;
    icon: string;
    status: string;
    colorClass: string; // e.g., 'secondary', 'primary'
    children: React.ReactNode;
    defaultOpen?: boolean;
    heroImage?: string; // Optional image for background
};

const FeatureBar = ({ title, icon, status, colorClass, children, defaultOpen = false, heroImage }: FeatureBarProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

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
                    <div className="pt-2 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2 font-body relative z-10">
                        {children}
                    </div>
                    {/* Background Image if available */}
                    {heroImage && (
                        <div className="absolute inset-0 opacity-[0.05] bg-cover bg-center mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('${heroImage}')` }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const VelocitySection = ({ services }: { services: ServiceContent[] }) => {
    const [activeTab, setActiveTab] = useState<'gen-ai' | 'audio'>('gen-ai');

    // Find services by ID (safely)
    const genAiService = services.find(s => s.id === 'gen-ai');
    const audioService = services.find(s => s.id === 'audio-restoration');

    return (
        <section id="velocity" className="py-24 bg-[#131318] border-y border-white/5 relative overflow-hidden">

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "linear-gradient(to bottom, transparent, black, transparent)" }}></div>

            <div className="layout-container max-w-[960px] mx-auto px-6 relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-block mb-4">
                        <span className="px-3 py-1 rounded text-xs font-mono text-secondary bg-secondary/10 border border-secondary/20">SYSTEM_VERSION: 2.0</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Introducing Ronimation Velocity™</h2>
                    <p className="text-gray-400 max-w-lg mx-auto font-body">Our proprietary AI-enhanced workflow engine designed to accelerate creative output without compromising soul.</p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('gen-ai')}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                activeTab === 'gen-ai'
                                    ? "bg-secondary text-black shadow-lg shadow-secondary/20"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            Generative AI
                        </button>
                        <button
                            onClick={() => setActiveTab('audio')}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                activeTab === 'audio'
                                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            Audio Restoration
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'gen-ai' && (
                            <motion.div
                                key="gen-ai"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-4"
                            >
                                {/* Dynamic Content from DB */}
                                {genAiService ? (
                                    <FeatureBar
                                        title={genAiService.title}
                                        icon="auto_awesome"
                                        status="Rendering..."
                                        colorClass="secondary"
                                        defaultOpen={true}
                                        heroImage={genAiService.heroImage}
                                    >
                                        {genAiService.description}
                                        <br /><br />
                                        <SmartLink href={`/services/${genAiService.id}`} className="text-secondary hover:underline">
                                            {genAiService.ctaText || 'Read Documentation'} →
                                        </SmartLink>
                                    </FeatureBar>
                                ) : (
                                    <div className="text-center text-gray-500 py-4">Generative AI service not found in DB.</div>
                                )}

                                <FeatureBar title="AI-Enhanced Editing" icon="content_cut" status="Optimized" colorClass="primary">
                                    Automated scene detection, smart cropping, and pacing analysis. Our tools assist editors by handling the repetitive tasks, leaving purely creative decisions to humans.
                                </FeatureBar>

                                <FeatureBar title="Data-Driven Creativity" icon="data_object" status="Analytics" colorClass="pink">
                                    Real-time audience engagement metrics fed back into the creative process to optimize content performance across platforms.
                                </FeatureBar>
                            </motion.div>
                        )}

                        {activeTab === 'audio' && (
                            <motion.div
                                key="audio"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-4"
                            >
                                {/* Dynamic Content from DB */}
                                {audioService ? (
                                    <FeatureBar
                                        title={audioService.title}
                                        icon="graphic_eq"
                                        status="Denoising"
                                        colorClass="purple"
                                        defaultOpen={true}
                                        heroImage={audioService.heroImage}
                                    >
                                        {audioService.description}
                                        <br /><br />
                                        <SmartLink href={`/services/${audioService.id}`} className="text-purple-500 hover:underline">
                                            {audioService.ctaText || 'View Case Studies'} →
                                        </SmartLink>
                                    </FeatureBar>
                                ) : (
                                    <div className="text-center text-gray-500 py-4">Audio Restoration service not found in DB.</div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
