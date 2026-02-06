import BlogForm from '@/components/admin/BlogForm';
import db from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Have to decodeURIComponent because slugs might have special chars if not careful, 
    // but usually slugs are simple. 

    const post = await db.blogPost.findUnique({
        where: { slug },
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold font-display">Edit Post</h1>
            <BlogForm post={post} />
        </div>
    );
}
