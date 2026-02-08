'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function sendContactMessage(prevState: any, formData: FormData) {
    const validatedFields = ContactSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { firstName, lastName, email, message } = validatedFields.data;

    try {
        const data = await resend.emails.send({
            from: 'Ronimation Contact <onboarding@resend.dev>', // Use verified domain or onboarding
            to: ['hello@ronimationstudios.com'], // Deliver to client (Verified email)
            subject: `New Contact Form Submission from ${firstName} ${lastName}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Message:
${message}
            `,
            replyTo: email,
        });

        if (data.error) {
            console.error('Detailed Resend Error:', JSON.stringify(data.error, null, 2));
            return {
                success: false,
                message: `Failed to send message: ${data.error.message}`,
            };
        }



        return {
            success: true,
            message: 'Message sent successfully!',
        };
    } catch (error) {
        console.error('Server error:', error);
        return {
            success: false,
            message: 'Internal server error. Please try again later.',
        };
    }
}
