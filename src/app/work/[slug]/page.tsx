import { getProjectBySlug, getProjects } from '@/lib/portfolio';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { SmartLink } from '@/components/ui/SmartLink';
import Image from 'next/image';

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found | Ronimation',
        };
    }

    return {
        title: `${project.title} | Ronimation Work`,
        description: project.description,
        openGraph: {
            images: [project.coverImage],
        },
    };
}

export const dynamic = 'force-dynamic';

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[70vh] w-full">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 pb-20">
                    <MotionWrapper className="max-w-[1280px] mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 rounded-full border border-primary/50 text-primary text-xs font-mono uppercase tracking-widest bg-primary/10">
                                {project.category}
                            </span>
                            {project.client && (
                                <span className="text-gray-400 font-mono text-sm">
                                    Client: {project.client}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6">{project.title}</h1>
                    </MotionWrapper>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

                    {/* Main Content */}
                    <div>
                        <MotionWrapper>
                            <h2 className="text-2xl font-bold mb-6 font-display">About the Project</h2>
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed whitespace-pre-line">
                                {project.fullDescription}
                            </div>
                        </MotionWrapper>

                        {/* Video Embed */}
                        {project.videoUrl && (
                            <MotionWrapper className="mt-12" delay={0.2}>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-white/5">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={project.videoUrl}
                                        title={project.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </MotionWrapper>
                        )}

                        {/* Gallery */}
                        {project.galleryImages.length > 0 && (
                            <MotionWrapper className="mt-12" delay={0.3}>
                                <h3 className="text-xl font-bold mb-6 font-display">Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.galleryImages.map((img, i) => (
                                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden glass-panel">
                                            <Image
                                                src={img}
                                                alt={`${project.title} image ${i + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </MotionWrapper>
                        )}
                    </div>

                    {/* Sidebar / Meta */}
                    <div className="lg:border-l lg:border-white/10 lg:pl-12">
                        <MotionWrapper delay={0.2}>
                            <h3 className="text-lg font-bold mb-4 font-display">Technologies</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="p-6 rounded-xl bg-surface-light/5 border border-white/5">
                                <h4 className="text-white font-bold mb-2">Ready to start?</h4>
                                <p className="text-sm text-gray-400 mb-4">Let's build something similar for your brand.</p>
                                <SmartLink
                                    href="/contact"
                                    className="block w-full text-center py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Get in Touch
                                </SmartLink>
                            </div>
                        </MotionWrapper>
                    </div>

                </div>
            </section>

            {/* Next Project (could be added) */}

            <Footer />
        </main>
    );
}
