'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ClientLogoSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    logo: z.string().min(1, 'Logo URL is required'),
});

export async function createClientLogo(formData: FormData) {
    try {
        const data = {
            name: formData.get('name') as string,
            logo: formData.get('logo') as string,
        };

        const validated = ClientLogoSchema.parse(data);

        await db.clientLogo.create({
            data: validated,
        });

        revalidatePath('/admin/clients');
        redirect('/admin/clients');
    } catch (error) {
        console.error('Failed to create client logo:', error);
        throw error;
    }
}

export async function updateClientLogo(id: string, formData: FormData) {
    try {
        const data = {
            name: formData.get('name') as string,
            logo: formData.get('logo') as string,
        };

        const validated = ClientLogoSchema.parse(data);

        await db.clientLogo.update({
            where: { id },
            data: validated,
        });

        revalidatePath('/admin/clients');
        redirect('/admin/clients');
    } catch (error) {
        console.error('Failed to update client logo:', error);
        throw error;
    }
}

export async function deleteClientLogo(id: string) {
    try {
        await db.clientLogo.delete({
            where: { id },
        });
        revalidatePath('/admin/clients');
    } catch (error) {
        console.error('Failed to delete client logo:', error);
        throw error;
    }
}
