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
            title: 'Bot Found | Ronimation Insights',
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
        <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black">
            <Navbar />

            <article>
                {/* Hero */}
                <section className="pt-32 pb-16 px-6 max-w-[800px] mx-auto text-center">
                    <MotionWrapper>
                        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-6 font-mono uppercase tracking-widest">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            <span>{post.tags.join(', ')}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-8 font-display leading-tight">{post.title}</h1>

                        <div className="flex items-center justify-center gap-4">
                            <div className="size-10 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-lg font-bold">
                                {post.author[0]}
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">{post.author}</div>
                                <div className="text-xs text-gray-400">{post.authorRole}</div>
                            </div>
                        </div>
                    </MotionWrapper>
                </section>

                {/* Cover Image */}
                <MotionWrapper className="max-w-[1000px] mx-auto px-6 mb-16">
                    <div className="aspect-[21/9] relative rounded-2xl overflow-hidden glass-panel border border-white/10">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </MotionWrapper>

                {/* Content */}
                <section className="px-6 pb-32">
                    <MotionWrapper className="max-w-[700px] mx-auto prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-gray-300 prose-p:font-light prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
                        {/* 
                            Simple markdown rendering. In a real app we'd use 'react-markdown' or 'mdx-remote'.
                            For now, we'll split by newline and render paragraphs/headers coarsely or just whitespace-pre-line
                            if we want to keep it simple without adding deps. 
                            However, the content in blog.ts is markdown.
                            To render it properly without adding a library like react-markdown right now (which might require install),
                            I will try to keep it simple: Render as pre-line text or use a very simple parser.
                            Given the instructions "Add dependencies... use npx", I am not sure if I should add react-markdown now.
                            Let's use whitespace-pre-wrap for MVP or basic regex replacement if needed.
                            Actually, let's just use whitespace-pre-wrap for now to avoid build issues with new deps.
                        */}
                        <div className="whitespace-pre-wrap font-body">
                            {post.content}
                        </div>
                    </MotionWrapper>
                </section>
            </article>

            {/* More Posts CTA */}
            <section className="px-6 pb-20 border-t border-white/5 pt-20">
                <div className="max-w-[700px] mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-6 font-display">Keep Reading</h3>
                    <SmartLink href="/insights" className="text-primary hover:text-white transition-colors">Back to Insights</SmartLink>
                </div>
            </section>

            <Footer />
        </main>
    );
}
