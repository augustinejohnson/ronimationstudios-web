'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ServiceSchema = z.object({
    id: z.string().min(1, 'Slug/ID is required'),
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().min(1, 'Subtitle is required'),
    description: z.string().min(1, 'Description is required'),
    heroImage: z.string().min(1, 'Hero Image URL is required'),
    ctaText: z.string().min(1, 'CTA Text is required'),
    ctaLink: z.string().min(1, 'CTA Link is required'),
    // JSON string for features
    features: z.string(),
});

export async function createService(formData: FormData) {
    try {
        const featuresJson = formData.get('features') as string || '[]';

        const data = {
            id: formData.get('id') as string,
            title: formData.get('title') as string,
            subtitle: formData.get('subtitle') as string,
            description: formData.get('description') as string,
            heroImage: formData.get('heroImage') as string,
            ctaText: formData.get('ctaText') as string,
            ctaLink: formData.get('ctaLink') as string,
            features: featuresJson,
        };

        const validated = ServiceSchema.parse(data);

        await db.service.create({
            data: validated,
        });

        revalidatePath('/admin/services');
        redirect('/admin/services');
    } catch (error) {
        console.error('Failed to create service:', error);
        throw error; // Let the client handle the error or redirect to an error page
    }
}

export async function updateService(currentId: string, formData: FormData) {
    try {
        const featuresJson = formData.get('features') as string || '[]';

        const data = {
            id: formData.get('id') as string,
            title: formData.get('title') as string,
            subtitle: formData.get('subtitle') as string,
            description: formData.get('description') as string,
            heroImage: formData.get('heroImage') as string,
            ctaText: formData.get('ctaText') as string,
            ctaLink: formData.get('ctaLink') as string,
            features: featuresJson,
        };

        const validated = ServiceSchema.parse(data);

        await db.service.update({
            where: { id: currentId },
            data: validated,
        });

        revalidatePath('/admin/services');
        revalidatePath('/services');
        revalidatePath(`/services/${data.id}`);
        revalidatePath('/');
        redirect('/admin/services');
    } catch (error) {
        console.error('Failed to update service:', error);
        throw error;
    }
}

export async function deleteService(id: string) {
    try {
        await db.service.delete({
            where: { id },
        });
        revalidatePath('/admin/services');
    } catch (error) {
        console.error('Failed to delete service:', error);
        throw error;
    }
}
