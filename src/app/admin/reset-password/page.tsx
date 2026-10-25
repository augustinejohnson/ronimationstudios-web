'use client';

import { useActionState } from 'react';
import { resetAdminPassword } from '@/app/actions/auth';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Link from 'next/link';

const initialState = {
    error: '',
    success: false,
    message: '',
};

export default function ResetPasswordPage() {
    const [state, action, isPending] = useActionState(resetAdminPassword, initialState);

    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center relative px-6 py-28">
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                <MotionWrapper className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md relative z-10 shadow-2xl">
                    <div className="text-center mb-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono uppercase tracking-wider mb-2">
                            Security Recovery
                        </span>
                        <h1 className="text-3xl font-bold font-display text-white">Reset Admin Password</h1>
                        <p className="text-xs text-gray-400 mt-2">
                            Set a new password using your Studio Recovery Key.
                        </p>
                    </div>

                    {state?.success ? (
                        <div className="space-y-6 text-center">
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
                                <span className="material-symbols-outlined text-3xl block mb-2">check_circle</span>
                                {state.message}
                            </div>

                            <Link
                                href="/admin/login"
                                className="block w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors text-center"
                            >
                                Proceed to Login →
                            </Link>
                        </div>
                    ) : (
                        <form action={action} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue="admin@ronimationstudios.com"
                                    required
                                    className="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                                    placeholder="admin@ronimationstudios.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                    Studio Recovery Key
                                </label>
                                <input
                                    type="password"
                                    name="recoveryKey"
                                    required
                                    className="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                                    placeholder="Enter Studio Recovery Key"
                                />
                                <p className="text-[11px] text-gray-500 mt-1">
                                    Default master key: <code className="text-purple-300">Ronimation2025!Admin</code>
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    required
                                    minLength={6}
                                    className="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                                    placeholder="At least 6 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    minLength={6}
                                    className="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400 transition-colors text-sm"
                                    placeholder="Repeat new password"
                                />
                            </div>

                            {state?.error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center">
                                    {state.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                            >
                                {isPending ? 'Resetting Password...' : 'Reset Password'}
                            </button>

                            <div className="pt-2 text-center">
                                <Link
                                    href="/admin/login"
                                    className="text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                    ← Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </MotionWrapper>
            </div>

            <Footer />
        </main>
    );
}
