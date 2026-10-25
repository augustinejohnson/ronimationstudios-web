'use client';

import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { InlineWidget } from 'react-calendly';

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white flex flex-col">
            <Navbar />

            {/* Studio Header */}
            <section className="pt-36 sm:pt-44 pb-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        Schedule an Appointment
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black mb-3 font-display tracking-tight text-white">
                        Book a Consultation
                    </h1>
                    <p className="text-base sm:text-lg text-purple-100/90 max-w-xl mx-auto font-body leading-relaxed">
                        Select a time slot below to discuss your project, 3D pipelines, or music production with our creative director.
                    </p>
                </div>
            </section>

            {/* Calendar Widget Container (Clean White Floating Canvas) */}
            <div className="flex-1 px-4 sm:px-6 pb-24 -mt-10 relative z-20">
                <div className="w-full max-w-4xl mx-auto h-[700px] bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(46,16,101,0.08)] relative">
                    {/* Fallback spinner */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <span className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                    </div>

                    <InlineWidget
                        url="https://calendly.com/ronimation/30min"
                        styles={{ height: '100%', width: '100%' }}
                        pageSettings={{
                            backgroundColor: 'ffffff',
                            hideEventTypeDetails: false,
                            hideLandingPageDetails: false,
                            primaryColor: '7c3aed',
                            textColor: '1e1b4b'
                        }}
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}
