import { getTeamMembers } from '@/lib/team';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Linkedin, Mail } from 'lucide-react';

export const metadata = {
    title: 'Our Team | Ronimation Studios',
    description: 'Meet the creative directors, 3D animators, audio engineers, and technologists behind Ronimation Studios.',
};

export default async function TeamPage() {
    const teamMembers = await getTeamMembers();

    const values = [
        {
            icon: 'verified',
            title: 'Radical Craftsmanship',
            description: 'We do not cut corners on mesh topology, PBR texturing, spatial sound balance, or render fidelity. Every frame matters.',
        },
        {
            icon: 'auto_stories',
            title: 'Narrative-First Worldbuilding',
            description: 'Whether designing a commercial ident or a full film score, our work is rooted in emotional storytelling and cultural depth.',
        },
        {
            icon: 'public',
            title: 'Global Impact, African Roots',
            description: 'Headquartered in Abuja, Nigeria, we deliver global-standard creative technology to studios, brands, and agencies worldwide.',
        },
    ];

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-purple-900 selection:text-white flex flex-col">
            <Navbar />

            {/* Studio Ambient Header */}
            <section className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div
                    className="absolute inset-0 opacity-[0.12] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }}
                />

                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        The Collective
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 font-display text-white tracking-tight">
                        Our Team
                    </h1>
                    <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-body leading-relaxed">
                        Meet the visionaries, directors, animators, and sound designers shaping the next generation of creative media at Ronimation Studios.
                    </p>
                </div>
            </section>

            {/* Team Showcase */}
            <section className="flex-1 px-4 sm:px-6 pb-20 -mt-10 relative z-20">
                <div className="max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <MotionWrapper key={i} delay={i * 0.08}>
                                <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(46,16,101,0.06)] border border-purple-100 flex flex-col items-center text-center hover:shadow-[0_25px_60px_rgba(46,16,101,0.12)] hover:-translate-y-1 transition-all duration-300 h-full group">
                                    {/* Member Avatar */}
                                    <div className="relative size-32 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 mb-6 shadow-md">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                                            <Image
                                                src={member.img || '/portfolio/aretestudio.jpg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full mb-5">
                                        {member.role}
                                    </span>

                                    <p className="text-sm text-slate-600 font-body italic leading-relaxed mb-6 flex-1">
                                        "{member.quote}"
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 w-full justify-center">
                                        {member.social.portfolio && (
                                            <a
                                                href={member.social.portfolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-9 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition-colors"
                                                aria-label="Portfolio"
                                            >
                                                <Globe className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.social.linkedin && (
                                            <a
                                                href={member.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-9 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition-colors"
                                                aria-label="LinkedIn"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.social.email && (
                                            <a
                                                href={`mailto:${member.social.email}`}
                                                className="size-9 rounded-full bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition-colors"
                                                aria-label="Email"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>

                    {/* Studio Culture & Values */}
                    <div className="mt-20">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-xs font-bold uppercase tracking-widest text-purple-700 font-display">
                                How We Operate
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1E1B4B] mt-2 mb-3">
                                Studio Culture & Philosophy
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 font-body">
                                We believe the highest caliber creative work happens at the intersection of discipline, technology, and artistic freedom.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {values.map((val, idx) => (
                                <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center">
                                    <div className="size-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5">
                                        <span className="material-symbols-outlined text-2xl">{val.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                                        {val.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                                        {val.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Join / Collab Banner */}
                    <div className="mt-16 bg-gradient-to-r from-[#1E1B4B] to-[#3B0764] rounded-3xl p-8 sm:p-12 text-white text-center flex flex-col items-center justify-center shadow-xl">
                        <span className="text-xs uppercase tracking-widest font-bold text-purple-300 font-display">
                            COLLABORATE WITH US
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-black font-display mt-2 mb-4">
                            Want to work alongside our team?
                        </h2>
                        <p className="text-sm sm:text-base text-purple-200 max-w-xl mb-8 leading-relaxed">
                            Whether you're looking to hire our studio for your next production or explore creative partnership, our doors are open.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 rounded-full bg-white text-[#1E1B4B] hover:bg-purple-50 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                            >
                                Get in Touch
                            </Link>
                            <Link
                                href="/booking"
                                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all"
                            >
                                Schedule Call
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
