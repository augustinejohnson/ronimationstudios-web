'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Users,
    Briefcase,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { logout } from '@/app/actions/auth';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Team', href: '/admin/team', icon: Users },
    { name: 'Work', href: '/admin/work', icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Don't show admin sidebar on login page
    if (pathname === '/admin/login') return <>{children}</>;

    const NavContent = () => (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl border-r border-white/10">
            <div className="p-6 flex items-center gap-3 border-b border-white/10">
                <div className="relative w-8 h-8">
                    {/* Placeholder or Logo */}
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-black font-display">R</div>
                </div>
                <span className="font-display font-bold text-xl tracking-tight">Admin</span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-white text-black font-medium shadow-lg shadow-white/5'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-400 group-hover:text-white'} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background-dark text-white flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
                <NavContent />
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                <span className="font-display font-bold text-xl">Admin</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black pt-20">
                    <NavContent />
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-12 pt-20 md:pt-12">
                <MotionWrapper>
                    {children}
                </MotionWrapper>
            </main>
        </div>
    );
}
