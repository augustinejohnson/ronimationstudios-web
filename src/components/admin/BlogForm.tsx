'use client';

import { createBlogPost, updateBlogPost } from '@/app/actions/blog';
import { useState } from 'react';

type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    authorRole: string;
    coverImage: string;
    tags: string; // JSON string from DB
};

export default function BlogForm({ post }: { post?: BlogPost }) {
    const isEditing = !!post;
    const [isSaving, setIsSaving] = useState(false);

    // Initial tags conversion
    const initialTags = post ? JSON.parse(post.tags).join(', ') : '';

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true);
        if (isEditing && post?.slug) {
            await updateBlogPost(post.slug, formData);
        } else {
            await createBlogPost(formData);
        }
        setIsSaving(false);
    };

    return (
        <form action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                    <input name="title" defaultValue={post?.title} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Slug (URL)</label>
                    <input name="slug" defaultValue={post?.slug} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Author</label>
                    <input name="author" defaultValue={post?.author} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Author Role</label>
                    <input name="authorRole" defaultValue={post?.authorRole} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date (e.g. March 15, 2024)</label>
                    <input name="date" defaultValue={post?.date} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma separated)</label>
                    <input name="tags" defaultValue={initialTags} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" placeholder="Tech, Design, Art" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image URL</label>
                <input name="coverImage" defaultValue={post?.coverImage} required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt</label>
                <textarea name="excerpt" defaultValue={post?.excerpt} required rows={2} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content (Markdown)</label>
                <textarea name="content" defaultValue={post?.content} required rows={10} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white font-mono" />
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
                {isSaving ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
            </button>
        </form>
    );
}
