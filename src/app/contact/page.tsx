'use client';

import { useTransition, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { sendContactMessage } from '../actions/contact'; // Import server action
import { siteRoutes } from '@/config/siteRoutes';
import { toast } from 'sonner';

export default function ContactPage() {
    const [isPending, startTransition] = useTransition();
    // We can track local state or use useActionState if we were on React 19 RC/Canary with Next 15,
    // but for stability with standard Next 14/15 setups, a transition wrapper around the action is solid.

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await sendContactMessage({ success: false, message: '' }, formData);

            if (result.success) {
                toast.success(result.message);
                // Optionally reset form here if needed, but HTML form reset handled by default behavior or Ref
                (document.getElementById('contact-form') as HTMLFormElement)?.reset();
            } else {
                toast.error(result.message);
                // Show field errors if any
                if (result.errors) {
                    Object.values(result.errors).flat().forEach(err => toast.error(err));
                }
            }
        });
    }

    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <MotionWrapper className="flex-1 flex items-center justify-center py-32 px-6">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#131318] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">

                    {/* Info Panel (Left) */}
                    <div className="p-12 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                        {/* Background Gradients */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
                        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse z-0"></div>

                        <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">Let's build something extraordinary.</h1>
                            <p className="text-gray-400 font-body text-lg leading-relaxed">
                                Whether you have a groundbreaking idea or just want to say hello, we’re ready to listen.
                            </p>
                        </div>

                        <div className="relative z-10 space-y-6 mt-12">
                            <div className="flex items-center gap-4 group">
                                <div className="size-12 rounded-full glass-panel flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                    <span className="material-symbols-outlined text-primary">mail</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Email</p>
                                    <a href="hello@ronimationstudios.com" className="text-lg font-bold hover:text-white transition-colors">hello@ronimationstudios.com</a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="size-12 rounded-full glass-panel flex items-center justify-center group-hover:border-secondary/50 transition-colors">
                                    <span className="material-symbols-outlined text-secondary">location_on</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Studio</p>
                                    <p className="text-lg font-bold">Abuja, Nigeria</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <Link href={siteRoutes.global.whatsapp} target="_blank" className="size-12 rounded-full glass-panel flex items-center justify-center group-hover:border-green-500/50 transition-colors">
                                    <span className="text-green-500 font-bold text-xl">WA</span>
                                </Link>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">WhatsApp</p>
                                    <Link href={siteRoutes.global.whatsapp} target="_blank" className="text-lg font-bold hover:text-white transition-colors">Chat with us</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Panel (Right) */}
                    <div className="p-12 bg-surface-dark border-l border-white/5">
                        <form id="contact-form" action={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider">First Name</label>
                                    <input name="firstName" type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-white" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider">Last Name</label>
                                    <input name="lastName" type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-white" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider">Email Address</label>
                                <input name="email" type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-white" placeholder="john@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-300 font-mono uppercase tracking-wider">Message</label>
                                <textarea name="message" rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary transition-colors text-white" placeholder="Tell us about your project..." required />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(138,44,226,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </MotionWrapper>

            <Footer />
        </main>
    );
}
