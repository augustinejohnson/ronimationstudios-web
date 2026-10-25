import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Link from 'next/link';

export const metadata = {
    title: 'Ronimation Velocity™ | High-Speed Production Pipeline',
    description: 'Explore Ronimation Velocity™ — our high-throughput creative pipeline combining neural AI generation, procedural 3D workflows, and surgical audio restoration.',
};

export default function VelocityPage() {
    const capabilities = [
        {
            icon: 'auto_awesome',
            title: 'Neural Concept Synthesis',
            tag: '01 / PRE-PRODUCTION',
            description: 'Compressing early-stage visual development from weeks into days. Rapid ideation across mood boards, character silhouettes, and cinematic keyframes.',
            metrics: '5x faster ideation',
        },
        {
            icon: 'view_in_ar',
            title: 'Procedural 3D Asset Pipeline',
            tag: '02 / ASSET CREATION',
            description: 'Production-ready 3D modeling, texturing, and rigging built with clean quad topology and optimized shader trees ready for game engines or VFX.',
            metrics: 'Sub-millimeter precision',
        },
        {
            icon: 'graphic_eq',
            title: 'Surgical Audio Restoration & Scoring',
            tag: '03 / SOUND ENGINEERING',
            description: 'Spectral de-noising, dialogue isolation, and adaptive original musical scoring crafted with industry-grade LUFS broadcast compliance.',
            metrics: 'Dolby Atmos & 3D Spatial',
        },
        {
            icon: 'bolt',
            title: 'Agile Milestone Delivery',
            tag: '04 / DEPLOYMENT',
            description: 'Continuous delivery sprints with live on-site asset previews, synchronized client reviews, and instant turnaround revisions.',
            metrics: 'Zero-latency feedback',
        },
    ];

    const benchmarks = [
        { value: '5x', label: 'Faster Concept Turnaround', desc: 'From initial brief to high-fidelity visual proofs' },
        { value: '100%', label: 'Production Ready', desc: 'Clean meshes, PBR textures, and mastered stems' },
        { value: '4K/8K', label: 'Cinematic Resolution', desc: 'Ultra-high-definition delivery across all disciplines' },
        { value: '24/7', label: 'Playbook Live Sync', desc: 'Real-time asset staging and collaborative approval' },
    ];

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-purple-900 selection:text-white flex flex-col">
            <Navbar />

            {/* Ambient Header */}
            <section className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div
                    className="absolute inset-0 opacity-[0.12] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />

                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-mono uppercase tracking-widest mb-4">
                        SYSTEM_VERSION: 2.0
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 font-display text-white tracking-tight">
                        Ronimation Velocity™
                    </h1>
                    <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-body leading-relaxed">
                        Our proprietary studio framework merging procedural generative tools, real-time engines, and bespoke artistry for ultra-fast creative delivery.
                    </p>
                </div>
            </section>

            {/* Benchmark Metrics Bar */}
            <section className="px-4 sm:px-6 -mt-10 relative z-20">
                <div className="max-w-[1280px] mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(46,16,101,0.08)] border border-purple-100 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                    {benchmarks.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="text-3xl sm:text-5xl font-black font-display text-purple-800 mb-1">
                                {item.value}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 font-display">
                                {item.label}
                            </span>
                            <span className="text-[11px] sm:text-xs text-slate-500 mt-1">
                                {item.desc}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Pipeline Pillars */}
            <section className="flex-1 px-4 sm:px-6 py-20 relative z-10">
                <div className="max-w-[1280px] mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest text-purple-700 font-display">
                            The Methodology
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1E1B4B] mt-2 mb-3">
                            Engineered for High-Stakes Production
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-body">
                            Traditional studios get bogged down in weeks of revisions. Velocity shortens feedback loops by putting real-time tools directly in your hands.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {capabilities.map((cap, i) => (
                            <MotionWrapper key={i} delay={i * 0.08}>
                                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-purple-200 hover:shadow-[0_20px_50px_rgba(46,16,101,0.1)] transition-all duration-300 flex flex-col justify-between h-full group">
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="size-12 rounded-2xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                                                <span className="material-symbols-outlined text-2xl">
                                                    {cap.icon}
                                                </span>
                                            </div>
                                            <span className="text-[11px] font-mono font-bold text-purple-600 uppercase tracking-widest">
                                                {cap.tag}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 group-hover:text-purple-800 transition-colors mb-2">
                                            {cap.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed mb-6">
                                            {cap.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                        <span className="font-semibold text-slate-400">Benchmark:</span>
                                        <span className="font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full">
                                            {cap.metrics}
                                        </span>
                                    </div>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>

                    {/* Velocity CTA Box */}
                    <div className="mt-16 bg-gradient-to-r from-[#1E1B4B] via-[#3B0764] to-[#1E1B4B] rounded-3xl p-8 sm:p-12 text-white text-center flex flex-col items-center justify-center shadow-xl">
                        <span className="text-xs uppercase tracking-widest font-mono text-purple-300">
                            START ACCELERATING
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black font-display mt-2 mb-4">
                            Deploy Velocity on Your Next Creative Brief
                        </h2>
                        <p className="text-sm sm:text-base text-purple-200 max-w-xl mb-8 leading-relaxed">
                            Have an upcoming feature, commercial, game trailer, or interactive campaign? Let's discuss timelines and milestones.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/booking"
                                className="px-8 py-3.5 rounded-full bg-white text-[#1E1B4B] hover:bg-purple-50 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                            >
                                Book a Velocity Sprint
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
                            >
                                Contact Production Desk
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
