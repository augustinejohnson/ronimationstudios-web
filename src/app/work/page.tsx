import { getProjects } from '@/lib/portfolio';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { WorkGrid } from '@/components/WorkGrid';

export default async function WorkPage() {
    const projects = await getProjects();

    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <MotionWrapper className="max-w-[1280px] mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">Selected Work</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
                        A showcase of our finest audio-visual experiences, spanning sound design, animation, and creative technology.
                    </p>
                </MotionWrapper>
            </section>

            <WorkGrid projects={projects} />

            <Footer />
        </main>
    );
}
