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
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative h-[60vh] sm:h-[70vh] w-full bg-[#1E1B4B]">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover opacity-50 pointer-events-none select-none"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 pb-12 sm:pb-16 text-white">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/30 border border-purple-400/40 text-purple-200">
                                {project.category}
                            </span>
                            {project.client && (
                                <span className="text-purple-200 text-xs sm:text-sm font-medium">
                                    Client: {project.client}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white mb-2">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Content Container (Floating White Canvas Style) */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 -mt-8 relative z-10">
                <div className="max-w-[1280px] mx-auto bg-white rounded-3xl p-6 sm:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-slate-100 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">

                    {/* Main Content */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 font-display text-slate-900">About the Project</h2>
                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-body leading-relaxed whitespace-pre-line text-sm sm:text-base">
                            {project.fullDescription}
                        </div>

                        {/* Video Embed */}
                        {project.videoUrl && (
                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4 font-display text-slate-900">Video Showcase</h3>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
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
                            </div>
                        )}

                        {/* Gallery */}
                        {project.galleryImages.length > 0 && (
                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4 font-display text-slate-900">Project Gallery</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.galleryImages.map((img, i) => (
                                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-xs">
                                            <Image
                                                src={img}
                                                alt={`${project.title} image ${i + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Meta */}
                    <div className="lg:border-l lg:border-slate-100 lg:pl-10">
                        <div className="sticky top-28 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 font-display">
                                    Technologies & Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-purple-50 text-xs font-semibold text-purple-900 border border-purple-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50/50 to-white border border-purple-100/80 shadow-xs">
                                <h4 className="text-slate-900 font-bold font-display text-base mb-1.5">Have a Project in Mind?</h4>
                                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                                    Let's collaborate and bring high-fidelity multimedia to your brand.
                                </p>
                                <SmartLink
                                    href="/contact"
                                    className="block w-full text-center py-3 rounded-full bg-[#1E1B4B] text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-900 transition-colors shadow-sm"
                                >
                                    Get in Touch ↗
                                </SmartLink>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
