import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import Image from 'next/image';
import { SmartLink } from '@/components/ui/SmartLink';

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Ronimation Insights',
        };
    }

    return {
        title: `${post.title} | Ronimation Insights`,
        description: post.excerpt,
        openGraph: {
            images: [post.coverImage],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#FAFAF8] text-[#1a1a2e] selection:bg-primary selection:text-white">
            <Navbar />

            <article>
                {/* Hero Header */}
                <section className="pt-36 sm:pt-44 pb-12 px-4 sm:px-6 max-w-[860px] mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-purple-700 mb-4 font-mono uppercase tracking-widest font-bold">
                        <span>{post.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                        <span>{post.tags.join(', ')}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 font-display text-slate-900 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3">
                        <div className="size-10 rounded-full bg-purple-100 text-purple-800 border border-purple-200 flex items-center justify-center text-sm font-bold font-display">
                            {post.author[0]}
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold text-slate-900">{post.author}</div>
                            <div className="text-xs text-slate-500">{post.authorRole}</div>
                        </div>
                    </div>
                </section>

                {/* Cover Image */}
                <div className="max-w-[1040px] mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
                    <div className="aspect-[21/9] relative rounded-3xl overflow-hidden shadow-lg border border-purple-100 bg-slate-100">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover pointer-events-none select-none"
                            priority
                        />
                    </div>
                </div>

                {/* Content */}
                <section className="px-4 sm:px-6 pb-24">
                    <div className="max-w-[760px] mx-auto bg-white rounded-3xl p-6 sm:p-12 shadow-[0_10px_35px_rgba(46,16,101,0.04)] border border-slate-100">
                        <div className="whitespace-pre-wrap font-body text-slate-700 leading-relaxed text-base sm:text-lg">
                            {post.content}
                        </div>
                    </div>
                </section>
            </article>

            {/* Back to Insights CTA */}
            <section className="px-4 sm:px-6 pb-20 pt-6">
                <div className="max-w-[760px] mx-auto text-center">
                    <SmartLink
                        href="/insights"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-purple-50 text-purple-900 font-bold text-sm border border-purple-200 shadow-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        <span>Back to All Insights</span>
                    </SmartLink>
                </div>
            </section>

            <Footer />
        </main>
    );
}
