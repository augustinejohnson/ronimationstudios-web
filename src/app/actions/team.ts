'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const TeamMemberSchema = z.object({
    id: z.string().optional(), // Allow optional ID for manual overrides
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    quote: z.string().min(1, 'Quote is required'),
    img: z.string().min(1, 'Image URL is required'),
    color: z.string().optional().default('#ffffff'),
    text: z.string().optional().default('black'),
    gradient: z.string().optional().default('none'),
    socialEmail: z.string().optional(),
    socialPortfolio: z.string().optional(),
    socialLinkedin: z.string().optional(),
});

export async function createTeamMember(formData: FormData) {
    try {
        const data = {
            id: formData.get('id') as string || undefined,
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            quote: formData.get('quote') as string,
            img: formData.get('img') as string,
            color: formData.get('color') as string,
            text: formData.get('text') as string,
            gradient: formData.get('gradient') as string,
            socialEmail: formData.get('socialEmail') as string,
            socialPortfolio: formData.get('socialPortfolio') as string,
            socialLinkedin: formData.get('socialLinkedin') as string,
        };

        const validated = TeamMemberSchema.parse(data);

        await db.teamMember.create({
            data: validated,
        });

        revalidatePath('/admin/team');
        redirect('/admin/team');
    } catch (error) {
        console.error('Failed to create team member:', error);
        throw error;
    }
}

export async function updateTeamMember(currentId: string, formData: FormData) {
    try {
        const data = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            quote: formData.get('quote') as string,
            img: formData.get('img') as string,
            color: formData.get('color') as string,
            text: formData.get('text') as string,
            gradient: formData.get('gradient') as string,
            socialEmail: formData.get('socialEmail') as string,
            socialPortfolio: formData.get('socialPortfolio') as string,
            socialLinkedin: formData.get('socialLinkedin') as string,
        };

        const validated = TeamMemberSchema.parse(data);

        await db.teamMember.update({
            where: { id: currentId },
            data: validated,
        });

        revalidatePath('/admin/team');
        redirect('/admin/team');
    } catch (error) {
        console.error('Failed to update team member:', error);
        throw error;
    }
}

export async function deleteTeamMember(id: string) {
    try {
        await db.teamMember.delete({
            where: { id },
        });
        revalidatePath('/admin/team');
    } catch (error) {
        console.error('Failed to delete team member:', error);
        throw error;
    }
}
