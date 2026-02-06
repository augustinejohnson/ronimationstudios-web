'use client';

import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { InlineWidget } from 'react-calendly';

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <MotionWrapper className="flex-1 flex flex-col items-center justify-center py-32 px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Book a Consultation</h1>
                    <p className="text-gray-400 font-body text-lg max-w-xl mx-auto">
                        Select a time slot below to discuss your project with our creative director.
                    </p>
                </div>

                {/* Calendar Widget */}
                <div className="w-full max-w-4xl h-[700px] bg-surface-dark border border-white/5 rounded-2xl overflow-hidden glass-panel relative">
                    {/* Fallback/Loading bg if widget takes time */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                    </div>

                    <InlineWidget
                        url="https://calendly.com/ronimation/30min"
                        styles={{ height: '100%', width: '100%' }}
                        pageSettings={{
                            backgroundColor: '111111',
                            hideEventTypeDetails: false,
                            hideLandingPageDetails: false,
                            primaryColor: '8a2ce2', // Matches primary purple
                            textColor: 'ffffff'
                        }}
                    />
                </div>
            </MotionWrapper>

            <Footer />
        </main>
    );
}
