'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const FeedbackSchema = z.object({
    rating: z.number().min(1).max(5),
    message: z.string().optional(),
});

export async function sendFeedback(prevState: any, formData: FormData) {
    const validatedFields = FeedbackSchema.safeParse({
        rating: Number(formData.get('rating')),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { rating, message } = validatedFields.data;

    try {
        const data = await resend.emails.send({
            from: 'Ronimation Feedback <onboarding@resend.dev>',
            to: ['hello@ronimationstudios.com'], // Deliver to verified email
            subject: `New Feedback Received: ${rating} Stars`,
            text: `
Rating: ${rating}/5 Stars
Message:
${message || 'No message provided.'}
            `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return {
                success: false,
                message: 'Failed to send feedback',
            };
        }

        return {
            success: true,
            message: 'Thank you for your feedback!',
        };
    } catch (error) {
        console.error('Server Error:', error);
        return {
            success: false,
            message: 'Internal server error',
        };
    }
}
