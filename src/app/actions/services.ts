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
    // For simplicity, we'll assume features are passed as a JSON string from the form
    // or we parse them if they are separate fields (but a JSON editor is easier for now)
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
}

export async function updateService(id: string, formData: FormData) {
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
        where: { id },
        data: validated,
    });

    revalidatePath('/admin/services');
    redirect('/admin/services');
}

export async function deleteService(id: string) {
    await db.service.delete({
        where: { id },
    });
    revalidatePath('/admin/services');
}
