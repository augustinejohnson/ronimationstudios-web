'use client';

import { SmartLink } from '@/components/ui/SmartLink';
import { siteRoutes } from '@/config/siteRoutes';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav-light transition-all duration-300">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <SmartLink href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/Ronimation Studios.png"
                            alt="Ronimation Studios"
                            width={150}
                            height={40}
                            className="object-contain h-10 w-auto rounded-md"
                        />
                    </SmartLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3">
                        <SmartLink href="/" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Home</SmartLink>
                        <SmartLink href="/portfolio" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Portfolio</SmartLink>
                        <SmartLink href="/work" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Work</SmartLink>
                        <SmartLink href="/services" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Services</SmartLink>
                        <SmartLink href="/velocity" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Velocity</SmartLink>
                        <SmartLink href="/team" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Team</SmartLink>
                        <SmartLink href="/insights" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Blog</SmartLink>
                        <SmartLink href="/contact" className="px-3.5 py-2 rounded-full border border-black/5 bg-black/[0.03] hover:bg-black/[0.08] hover:border-black/10 text-gray-700 hover:text-gray-950 text-sm font-medium transition-all backdrop-blur-sm">Contact</SmartLink>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex">
                        <SmartLink
                            href={siteRoutes.hero.startProject}
                            className="relative flex items-center justify-center rounded-full h-10 px-6 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold tracking-wide shadow-md hover:shadow-lg hover:shadow-primary/25 hover:opacity-95 transition-all group"
                        >
                            <span>Start Project</span>
                        </SmartLink>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden text-gray-800 p-2 focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-nav-light absolute w-full left-0 top-20 border-t border-black/5 bg-[#FAFAF8]/95 overflow-hidden shadow-lg"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            <SmartLink href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Home</SmartLink>
                            <SmartLink href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Portfolio</SmartLink>
                            <SmartLink href="/work" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Work</SmartLink>
                            <SmartLink href="/services" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Services</SmartLink>
                            <SmartLink href="/velocity" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Velocity</SmartLink>
                            <SmartLink href="/team" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Team</SmartLink>
                            <SmartLink href="/insights" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Blog</SmartLink>
                            <SmartLink href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</SmartLink>
                            <SmartLink
                                href={siteRoutes.hero.startProject}
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 text-center py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-md"
                            >
                                Start Project
                            </SmartLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
