'use client';

import { SmartLink } from '@/components/ui/SmartLink';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <section className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                    <h1 className="text-[12rem] font-bold font-display leading-none text-transparent bg-clip-text bg-gradient-to-br from-white/10 to-white/5 select-none">404</h1>
                </div>

                <h2 className="text-3xl font-bold mb-4 font-display">Signal Lost</h2>
                <p className="text-gray-400 max-w-md mb-8 font-body">
                    The page you are looking for has been moved, deleted, or does not exist.
                </p>

                <SmartLink
                    href="/"
                    className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                >
                    Return to Base
                </SmartLink>
            </section>

            <Footer />
        </main>
    );
}
