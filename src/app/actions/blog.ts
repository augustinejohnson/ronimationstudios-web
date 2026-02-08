'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const BlogPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().min(1, 'Content is required'),
    date: z.string().min(1, 'Date is required'),
    author: z.string().min(1, 'Author is required'),
    authorRole: z.string().min(1, 'Author Role is required'),
    coverImage: z.string().min(1, 'Cover Image is required'),
    tags: z.string(), // We'll receive comma separated string and parse it manually if needed, or validate JSON string
});

export async function createBlogPost(formData: FormData) {
    const rawTags = formData.get('tags') as string;
    // Simple comma-sep handling:
    const tagArray = rawTags.split(',').map(t => t.trim()).filter(Boolean);
    const tagsJson = JSON.stringify(tagArray);

    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        date: formData.get('date') as string,
        author: formData.get('author') as string,
        authorRole: formData.get('authorRole') as string,
        coverImage: formData.get('coverImage') as string,
        tags: tagsJson,
    };

    const validated = BlogPostSchema.parse(data);

    await db.blogPost.create({
        data: validated,
    });

    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updateBlogPost(slug: string, formData: FormData) {
    const rawTags = formData.get('tags') as string;
    const tagArray = rawTags.split(',').map(t => t.trim()).filter(Boolean);
    const tagsJson = JSON.stringify(tagArray);

    const data = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        date: formData.get('date') as string,
        author: formData.get('author') as string,
        authorRole: formData.get('authorRole') as string,
        coverImage: formData.get('coverImage') as string,
        tags: tagsJson,
    };

    const validated = BlogPostSchema.parse(data);

    await db.blogPost.update({
        where: { slug: slug }, // Using old slug to find
        data: validated,
    });

    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function deleteBlogPost(slug: string) {
    await db.blogPost.delete({
        where: { slug },
    });
    revalidatePath('/admin/blog');
}
