'use client';

import { SmartLink } from '@/components/ui/SmartLink';
import { siteRoutes } from '@/config/siteRoutes';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <SmartLink href={siteRoutes.global.home} className="flex items-center gap-3 group">
                        <Image
                            src="/Ronimation Studios.png"
                            alt="Ronimation Studios"
                            width={150}
                            height={40}
                            className="object-contain h-10 w-auto"
                        />
                    </SmartLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        <SmartLink href={siteRoutes.global.home} className="px-5 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all backdrop-blur-sm">Home</SmartLink>
                        <SmartLink href="/#services" className="px-5 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all backdrop-blur-sm">Services</SmartLink>
                        <SmartLink href="/#velocity" className="px-5 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all backdrop-blur-sm">Velocity</SmartLink>
                        <SmartLink href="/#team" className="px-5 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all backdrop-blur-sm">Team</SmartLink>
                        <SmartLink href="/insights" className="px-5 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all backdrop-blur-sm">Blog</SmartLink>
                        <SmartLink href="/contact" className="px-5 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all backdrop-blur-sm">Contact</SmartLink>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex">
                        <SmartLink
                            href={siteRoutes.hero.startProject}
                            className="border-gradient relative flex items-center justify-center rounded-full h-10 px-6 bg-white/5 hover:bg-white/10 transition-all group"
                        >
                            <span className="text-white text-sm font-bold tracking-wide group-hover:text-secondary transition-colors">Start Project</span>
                        </SmartLink>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined">menu</span>
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
                        className="md:hidden glass-nav absolute w-full left-0 top-20 border-t border-white/5 overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            <SmartLink href="/#services" onClick={() => setMobileMenuOpen(false)} className="text-gray-300">Services</SmartLink>
                            <SmartLink href="/#velocity" onClick={() => setMobileMenuOpen(false)} className="text-gray-300">Velocity</SmartLink>
                            <SmartLink href="/#team" onClick={() => setMobileMenuOpen(false)} className="text-gray-300">Team</SmartLink>
                            <SmartLink href="/insights" onClick={() => setMobileMenuOpen(false)} className="text-gray-300">Blog</SmartLink>
                            <SmartLink href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-300">Contact</SmartLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
