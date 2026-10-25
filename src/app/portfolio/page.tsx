import { Navbar } from '@/components/sections/Navbar';
import { PortfolioShowcase } from '@/components/sections/PortfolioShowcase';
import { Footer } from '@/components/sections/Footer';

export const metadata = {
    title: 'Portfolio Showcase | Ronimation Studios',
    description: 'Explore Ronimation Studios official Playbook creative storage — 3D models, visual designs, conceptual drawings, video productions, audio scores, and masterworks.',
};

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-purple-900 selection:text-white flex flex-col">
            <Navbar />
            <PortfolioShowcase />
            <Footer />
        </main>
    );
}
