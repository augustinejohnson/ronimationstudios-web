'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { signSession, verifyPassword } from '@/lib/auth';
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

    const user = await db.adminUser.findUnique({
        where: { email: validEmail },
    });

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

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/admin/login');
}
