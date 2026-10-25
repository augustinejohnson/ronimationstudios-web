'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PortfolioCategory {
    id: string;
    title: string;
    description: string;
    image: string;
    embedUrl: string;
}

// Master Vault containing the complete studio collection
const PLAYBOOK_MASTER_EMBED = 'https://www.playbook.com/e/arete/h2fz3ppBxGQvvTYH3te5JB1f?theme=gallery&assetNumber=3&displaySize=medium';

// Categories with their distinct, verified Playbook embed URLs
const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
    {
        id: '3d-models',
        title: '3D Models',
        description: 'Create minimalist 3D models and character assets.',
        image: '/portfolio/3d-models.jpg',
        embedUrl: 'https://www.playbook.com/e/arete/fNC8YxLYSxueETLaGXUJH4ir?theme=gallery&assetNumber=3&displaySize=medium',
    },
    {
        id: 'designs',
        title: 'Designs',
        description: 'Brand identities, vector systems, and UI designs.',
        image: '/portfolio/designs.jpg',
        embedUrl: 'https://www.playbook.com/e/arete/fnrdHphKwn3ezP8LbxZrTMMD?theme=gallery&assetNumber=3&displaySize=medium',
    },
    {
        id: 'drawings',
        title: 'Drawings',
        description: 'Concept art, cinematic storyboards, and drawings.',
        image: '/portfolio/drawings.jpg',
        embedUrl: 'https://www.playbook.com/e/arete/TnicM6sdUJd746AshxukvgMX?theme=gallery&assetNumber=3&displaySize=medium',
    },
    {
        id: 'video-productions',
        title: 'Video Productions',
        description: 'Cinematics, motion reels, and video productions.',
        image: '/portfolio/video-productions.jpg',
        embedUrl: 'https://www.playbook.com/e/arete/2rbMbjMeXwovXqVHe6otPK3M?theme=gallery&assetNumber=3&displaySize=medium',
    },
    {
        id: 'audios',
        title: 'Audios',
        description: 'Audio scores, restorations, and soundscapes.',
        image: '/portfolio/audios.jpg',
        embedUrl: 'https://www.playbook.com/e/arete/ENphqH1sBN5ZxoVd5q525Umh?theme=gallery&assetNumber=3&displaySize=medium',
    },
    {
        id: 'aretestudio',
        title: 'Aretestudio',
        description: 'Studio masterworks and experimental collections.',
        image: '/portfolio/aretestudio.jpg',
        embedUrl: 'https://www.playbook.com/e/arete/6p7aSVt9jzRK4jRmDWpi6pkf?theme=gallery&assetNumber=3&displaySize=medium',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export const PortfolioShowcase = () => {
    // Controls the on-site live Playbook viewer modal
    const [activeViewer, setActiveViewer] = useState<PortfolioCategory | null>(null);

    return (
        <section
            id="portfolio"
            className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#3B0764] overflow-hidden"
        >
            {/* Subtle Studio Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />

            {/* Floating Studio Canvas Frame */}
            <div className="relative z-10 max-w-[1280px] mx-auto w-full">
                <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-white/20">

                    {/* Header Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display text-[#1E1B4B] mb-3">
                            Ronimation Studios
                        </h1>

                        <p className="text-lg sm:text-2xl font-medium text-slate-600 font-display">
                            Where Technology Meets Creativity
                        </p>
                    </motion.div>

                    {/* 3x2 Grid of Minimalist Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full mb-10"
                    >
                        {PORTFOLIO_CATEGORIES.map((category) => (
                            <motion.div key={category.id} variants={itemVariants} className="h-full">
                                <div
                                    onClick={() => setActiveViewer(category)}
                                    className="group relative flex flex-col h-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(46,16,101,0.1)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
                                >
                                    {/* Visual Image Preview */}
                                    <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                                        />
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 font-display tracking-tight group-hover:text-purple-700 transition-colors">
                                                {category.title}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-slate-500 font-body mt-1 leading-relaxed">
                                                {category.description}
                                            </p>
                                        </div>

                                        {/* Action Link */}
                                        <div className="pt-3 mt-2 flex items-center justify-between text-sm font-semibold text-[#1E1B4B] group-hover:text-purple-700 transition-colors">
                                            <span className="flex items-center gap-1">
                                                <span>View Assets</span>
                                                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                                    open_in_new
                                                </span>
                                            </span>
                                            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                                                Live Sync
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom Master CTA */}
                    <div className="text-center pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-400 font-medium">
                            Live Synced with Playbook Creative Storage • Protected View (Downloads Disabled)
                        </p>

                        <button
                            onClick={() => setActiveViewer({
                                id: 'master',
                                title: 'Ronimation Studios Master Vault',
                                description: 'Complete portfolio archive across all disciplines',
                                image: '/portfolio/aretestudio.jpg',
                                embedUrl: PLAYBOOK_MASTER_EMBED,
                            })}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1B4B] hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow cursor-pointer group"
                        >
                            <span>Open Full Studio Vault</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                open_in_full
                            </span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-10 mt-10 flex flex-col items-center justify-center text-white"
            >
                <a
                    href="/services"
                    className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity animate-bounce group"
                >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-200 group-hover:text-white transition-colors">
                        Explore Studio Services
                    </span>
                    <span className="material-symbols-outlined text-purple-200 text-xl">
                        keyboard_arrow_down
                    </span>
                </a>
            </motion.div>

            {/* On-Site Protected Playbook Live Viewer Modal */}
            <AnimatePresence>
                {activeViewer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="relative w-full max-w-6xl h-[88vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-purple-200/50"
                        >
                            {/* Viewer Header */}
                            <div className="px-6 py-4 bg-[#1E1B4B] text-white flex items-center justify-between border-b border-purple-900/50">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-purple-600/40 border border-purple-400/40 flex items-center justify-center text-purple-200">
                                        <span className="material-symbols-outlined text-base">folder_special</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold font-display text-white">
                                            {activeViewer.title}
                                        </h3>
                                        <p className="text-[11px] text-purple-200/80 hidden sm:block">
                                            Live Playbook Gallery • Protected View (Downloads Disabled)
                                        </p>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setActiveViewer(null)}
                                        className="size-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label="Close viewer"
                                    >
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Live Playbook Embed Frame */}
                            <div className="flex-1 w-full h-full relative bg-slate-50">
                                <iframe
                                    key={activeViewer.embedUrl}
                                    src={activeViewer.embedUrl}
                                    title={`${activeViewer.title} - Playbook.com`}
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>

                            {/* Viewer Footer */}
                            <div className="px-6 py-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>Live sync active — changes made in this Playbook board reflect here automatically</span>
                                </div>
                                <span className="font-semibold text-purple-900 hidden sm:inline">
                                    Ronimation Studios Official Archive
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
