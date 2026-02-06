import Link from 'next/link';
import db from '@/lib/db';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteBlogPost } from '@/app/actions/blog';

export default async function BlogAdminPage() {
    const posts = await db.blogPost.findMany({
        orderBy: { date: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-display">Blog Posts</h1>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                    <Plus size={18} />
                    New Post
                </Link>
            </div>

            <div className="grid gap-4">
                {posts.map((post) => (
                    <div key={post.slug} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between group">
                        <div className="min-w-0">
                            <h3 className="font-bold text-lg truncate">{post.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.author}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                            <Link
                                href={`/admin/blog/${post.slug}`}
                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                            >
                                <Edit size={18} />
                            </Link>

                            <form action={async () => {
                                'use server';
                                await deleteBlogPost(post.slug);
                            }}>
                                <button type="submit" className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
