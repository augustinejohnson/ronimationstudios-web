'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { sendContactMessage } from '../actions/contact';
import { siteRoutes } from '@/config/siteRoutes';
import { toast } from 'sonner';

export default function ContactPage() {
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await sendContactMessage({ success: false, message: '' }, formData);

            if (result.success) {
                toast.success(result.message);
                (document.getElementById('contact-form') as HTMLFormElement)?.reset();
            } else {
                toast.error(result.message);
                if (result.errors) {
                    Object.values(result.errors).flat().forEach((err) => toast.error(err));
                }
            }
        });
    }

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white flex flex-col">
            <Navbar />

            {/* Studio Ambient Header */}
            <section className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        Direct Inquiries
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 font-display text-white tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-body leading-relaxed">
                        Ready to start a production, license our work, or consult on a multimedia project? We'd love to collaborate.
                    </p>
                </div>
            </section>

            {/* Floating Form Canvas */}
            <div className="flex-1 px-4 sm:px-6 pb-24 -mt-12 relative z-20">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(46,16,101,0.08)] border border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">

                    {/* Info Panel (Left) */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#1E1B4B] mb-3">
                                Let's build something extraordinary.
                            </h2>
                            <p className="text-slate-600 font-body text-sm sm:text-base leading-relaxed mb-8">
                                Whether you have a 3D animation, game asset pipeline, film score, or brand identity project, our team is ready to deliver.
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4 group">
                                    <div className="size-11 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-lg">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-display">Email</p>
                                        <a href="mailto:hello@ronimationstudios.com" className="text-sm sm:text-base font-bold text-slate-900 hover:text-purple-700 transition-colors">
                                            hello@ronimationstudios.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="size-11 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-lg">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-display">Studio</p>
                                        <p className="text-sm sm:text-base font-bold text-slate-900">Abuja, Nigeria</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <Link href={siteRoutes.global.whatsapp} target="_blank" className="size-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform font-bold text-sm">
                                        WA
                                    </Link>
                                    <div>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-display">WhatsApp</p>
                                        <Link href={siteRoutes.global.whatsapp} target="_blank" className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                                            Chat with us directly ↗
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Panel (Right) */}
                    <div className="md:border-l md:border-slate-100 md:pl-10">
                        <form id="contact-form" action={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 font-display uppercase tracking-wider">First Name</label>
                                    <input name="firstName" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors text-slate-900 text-sm" placeholder="John" required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 font-display uppercase tracking-wider">Last Name</label>
                                    <input name="lastName" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors text-slate-900 text-sm" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 font-display uppercase tracking-wider">Email Address</label>
                                <input name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors text-slate-900 text-sm" placeholder="john@example.com" required />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 font-display uppercase tracking-wider">Message</label>
                                <textarea name="message" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors text-slate-900 text-sm" placeholder="Tell us about your project..." required />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-3.5 rounded-full bg-[#1E1B4B] hover:bg-purple-900 text-white font-bold text-sm tracking-wide shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
                            >
                                {isPending ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message ↗'
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
