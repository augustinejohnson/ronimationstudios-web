'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Link from 'next/link';

const initialState = {
    error: '',
};

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, initialState);

    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center relative px-6 py-24">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <MotionWrapper className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md relative z-10 shadow-2xl">
                    <h1 className="text-3xl font-bold mb-6 font-display text-center">Admin Login</h1>

                    <form action={action} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@ronimationstudios.com"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-400">Password</label>
                                <Link
                                    href="/admin/reset-password"
                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        {state?.error && (
                            <div className="text-red-400 text-sm text-center">
                                {state.error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="text-center pt-2">
                            <Link
                                href="/admin/reset-password"
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                Need to reset your password? Click here →
                            </Link>
                        </div>
                    </form>
                </MotionWrapper>
            </div>

            <Footer />
        </main>
    );
}
