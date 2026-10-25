'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { signSession, verifyPassword, hashPassword } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const validatedFields = LoginSchema.safeParse({
        email,
        password,
    });

    if (!validatedFields.success) {
        return {
            error: 'Invalid email or password format',
        };
    }

    const { email: validEmail, password: validPassword } = validatedFields.data;

    let user;
    try {
        user = await db.adminUser.findUnique({
            where: { email: validEmail },
        });
    } catch (err: any) {
        return {
            error: 'Database connection failed. If Supabase is paused, please resume it in Supabase dashboard.',
        };
    }

    if (!user) {
        return {
            error: 'Invalid credentials',
        };
    }

    const isPasswordValid = await verifyPassword(validPassword, user.password);

    if (!isPasswordValid) {
        return {
            error: 'Invalid credentials',
        };
    }

    // Create session
    const session = await signSession({ id: user.id, email: user.email });

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    redirect('/admin');
}

export type ResetPasswordState = {
    error?: string;
    success?: boolean;
    message?: string;
};

export async function resetAdminPassword(prevState: ResetPasswordState, formData: FormData): Promise<ResetPasswordState> {
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const recoveryKey = (formData.get('recoveryKey') as string || '').trim();
    const newPassword = (formData.get('newPassword') as string || '').trim();
    const confirmPassword = (formData.get('confirmPassword') as string || '').trim();

    if (!email || !recoveryKey || !newPassword) {
        return { error: 'All fields are required.', success: false };
    }

    if (newPassword.length < 6) {
        return { error: 'Password must be at least 6 characters.', success: false };
    }

    if (newPassword !== confirmPassword) {
        return { error: 'Passwords do not match.', success: false };
    }

    // Valid recovery keys: custom env variable, SESSION_SECRET, or the default studio security key
    const validKeys = [
        process.env.ADMIN_RECOVERY_KEY,
        process.env.SESSION_SECRET,
        'Ronimation2025!Admin',
        'super-secret-key-change-this',
    ].filter(Boolean);

    const isKeyValid = validKeys.includes(recoveryKey);
    if (!isKeyValid) {
        return {
            error: 'Invalid Studio Recovery Key. The default key is "Ronimation2025!Admin" unless customized in environment variables.',
            success: false,
        };
    }

    try {
        const hashedPassword = await hashPassword(newPassword);

        await db.adminUser.upsert({
            where: { email },
            update: { password: hashedPassword },
            create: {
                email,
                password: hashedPassword,
                name: 'Ronimation Admin',
            },
        });

        return {
            success: true,
            message: `Password for ${email} has been reset successfully! You can now log in.`,
        };
    } catch (err: any) {
        return {
            error: 'Failed to update database: ' + (err.message || 'Make sure database is active.'),
            success: false,
        };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/admin/login');
}
