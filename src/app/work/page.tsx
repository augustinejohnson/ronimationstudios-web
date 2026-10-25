import { getProjects } from '@/lib/portfolio';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { WorkGrid } from '@/components/WorkGrid';

export default async function WorkPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white">
            <Navbar />

            {/* Studio Header (Matches the new brand theme) */}
            <section className="pt-36 sm:pt-44 pb-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
                        backgroundSize: '36px 36px'
                    }}>
                </div>

                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        Featured Portfolio
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 font-display text-white tracking-tight">
                        Selected Work
                    </h1>
                    <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-body leading-relaxed">
                        A curated showcase of our finest 3D models, visual identities, animations, audio scores, and creative technology.
                    </p>
                </div>
            </section>

            {/* Work Grid */}
            <WorkGrid projects={projects} />

            <Footer />
        </main>
    );
}
