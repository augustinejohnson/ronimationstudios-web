'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const TeamMemberSchema = z.object({
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
    const data = {
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
}

export async function updateTeamMember(id: string, formData: FormData) {
    const data = {
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
        where: { id },
        data: validated,
    });

    revalidatePath('/admin/team');
    redirect('/admin/team');
}

export async function deleteTeamMember(id: string) {
    await db.teamMember.delete({
        where: { id },
    });
    revalidatePath('/admin/team');
}
