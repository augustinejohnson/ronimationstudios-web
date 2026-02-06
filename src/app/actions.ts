'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactState = {
    success: boolean;
    message: string;
    errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function sendContactMessage(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const validatedFields = contactSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed. Please check your inputs.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { firstName, lastName, email, message } = validatedFields.data;

    try {
        const data = await resend.emails.send({
            from: 'Ronimation Contact Form <onboarding@resend.dev>', // Default testing domain
            to: 'hello@ronimationstudios.com', // User's email (placeholder)
            subject: `New Message from ${firstName} ${lastName}`,
            text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        
        Message:
        ${message}
      `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return { success: false, message: 'Failed to send message via email service. Please try again.' };
        }

        return {
            success: true,
            message: 'Message sent successfully! We will be in touch soon.',
        };

    } catch (error) {
        console.error('Server Error:', error);
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
        };
    }
}
