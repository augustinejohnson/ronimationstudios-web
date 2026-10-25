import { getAllPosts } from '@/lib/blog';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { SmartLink } from '@/components/ui/SmartLink';
import Image from 'next/image';

export default async function InsightsPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white">
            <Navbar />

            {/* Studio Header */}
            <section className="pt-36 sm:pt-44 pb-20 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#3B0764] via-[#581C87] to-[#FAFAF8] text-white">
                <div className="max-w-[1280px] mx-auto text-center relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
                        Articles & Research
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 font-display text-white tracking-tight">
                        Insights
                    </h1>
                    <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-body leading-relaxed">
                        Thoughts, tutorials, and breakthroughs on the convergence of 3D artistry, generative AI, and modern media.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="px-4 sm:px-6 pb-32 -mt-6 relative z-20">
                <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post, index) => (
                        <MotionWrapper key={post.slug} delay={index * 0.1}>
                            <SmartLink href={`/insights/${post.slug}`} className="group block bg-white rounded-2xl p-5 border border-purple-100/80 shadow-[0_4px_20px_rgba(46,16,101,0.04)] hover:shadow-[0_16px_36px_rgba(46,16,101,0.1)] hover:-translate-y-1.5 transition-all duration-300">
                                <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-4 bg-slate-100">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                                    />
                                </div>

                                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2 font-mono">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span className="text-purple-700 font-bold uppercase">{post.tags[0]}</span>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 mb-2 font-display group-hover:text-purple-700 transition-colors leading-snug">
                                    {post.title}
                                </h2>

                                <p className="text-slate-500 text-sm line-clamp-2 font-body leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                                    <span>Read Article</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </div>
                            </SmartLink>
                        </MotionWrapper>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
