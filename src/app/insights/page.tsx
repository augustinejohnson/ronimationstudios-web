import { getAllPosts } from '@/lib/blog';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { SmartLink } from '@/components/ui/SmartLink';
import Image from 'next/image';

export default async function InsightsPage() {
    const posts = await getAllPosts();

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
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">Insights</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-body">
                        Thoughts on the convergence of creativity and technology.
                    </p>
                </MotionWrapper>
            </section>

            {/* Posts Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {posts.map((post, index) => (
                        <MotionWrapper key={post.slug} delay={index * 0.1}>
                            <SmartLink href={`/insights/${post.slug}`} className="group block">
                                <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-mono">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span className="text-primary">{post.tags[0]}</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 font-display group-hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                            </SmartLink>
                        </MotionWrapper>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
