'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PortfolioItemSchema = z.object({
    id: z.string().min(1, 'Slug/ID is required'),
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'Category is required'),
    client: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    fullDescription: z.string().min(1, 'Full Description is required'),
    coverImage: z.string().min(1, 'Cover Image is required'),
    videoUrl: z.string().optional(),
    date: z.string().optional(),
    // JSON strings will be created from form data
    galleryImages: z.string(),
    tags: z.string(),
});

export async function createPortfolioItem(formData: FormData) {
    const rawTags = formData.get('tags') as string;
    const tagArray = rawTags.split(',').map(t => t.trim()).filter(Boolean);
    const tagsJson = JSON.stringify(tagArray);

    const rawGallery = formData.get('galleryImages') as string;
    // Assume gallery images are comma separated URLs for now simplicity
    const galleryArray = rawGallery.split(',').map(t => t.trim()).filter(Boolean);
    const galleryJson = JSON.stringify(galleryArray);

    const data = {
        id: formData.get('id') as string,
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        client: formData.get('client') as string,
        description: formData.get('description') as string,
        fullDescription: formData.get('fullDescription') as string,
        coverImage: formData.get('coverImage') as string,
        videoUrl: formData.get('videoUrl') as string,
        date: formData.get('date') as string,
        galleryImages: galleryJson,
        tags: tagsJson,
    };

    const validated = PortfolioItemSchema.parse(data);

    await db.portfolioItem.create({
        data: validated,
    });

    revalidatePath('/admin/work');
    redirect('/admin/work');
}

export async function updatePortfolioItem(id: string, formData: FormData) {
    const rawTags = formData.get('tags') as string;
    const tagArray = rawTags.split(',').map(t => t.trim()).filter(Boolean);
    const tagsJson = JSON.stringify(tagArray);

    const rawGallery = formData.get('galleryImages') as string;
    const galleryArray = rawGallery.split(',').map(t => t.trim()).filter(Boolean);
    const galleryJson = JSON.stringify(galleryArray);

    const data = {
        id: formData.get('id') as string,
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        client: formData.get('client') as string,
        description: formData.get('description') as string,
        fullDescription: formData.get('fullDescription') as string,
        coverImage: formData.get('coverImage') as string,
        videoUrl: formData.get('videoUrl') as string,
        date: formData.get('date') as string,
        galleryImages: galleryJson,
        tags: tagsJson,
    };

    const validated = PortfolioItemSchema.parse(data);

    // If ID changed, we need to handle that? Schema says ID is slug.
    // Primsa update where id = oldId.
    // If the user changed the ID field, we might fail or we update the ID.
    // Generally updating Primary IDs is risky but possible.

    await db.portfolioItem.update({
        where: { id },
        data: validated,
    });

    revalidatePath('/admin/work');
    redirect('/admin/work');
}

export async function deletePortfolioItem(id: string) {
    await db.portfolioItem.delete({
        where: { id },
    });
    revalidatePath('/admin/work');
}
