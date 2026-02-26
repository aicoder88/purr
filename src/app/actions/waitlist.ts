'use server';

import prisma from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { z } from 'zod';

const waitlistSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export async function joinWaitlist(formData: FormData) {
    try {
        const email = formData.get('email') as string;

        // Validate email
        const validatedData = waitlistSchema.safeParse({ email });
        if (!validatedData.success) {
            return { success: false, error: 'Please enter a valid email address' };
        }

        if (!prisma) {
            console.warn("Database connection unavailable, falling back to just returning success");
            return { success: true, message: 'Thanks for joining the waitlist! (DB Offline)' };
        }

        // Check if email already exists in DB
        const existingEntry = await prisma.waitlist.findUnique({
            where: { email: validatedData.data.email },
        });

        if (existingEntry) {
            return { success: true, message: 'You are already on the waitlist!' };
        }

        // Save to database
        await prisma.waitlist.create({
            data: {
                email: validatedData.data.email,
            },
        });

        // Sync to Resend if keys exist
        const resendApiKey = process.env.RESEND_API_KEY;
        const resendAudienceId = process.env.RESEND_AUDIENCE_ID;

        if (resendApiKey && resendAudienceId) {
            try {
                await resend.contacts.create({
                    email: validatedData.data.email,
                    audienceId: resendAudienceId,
                });
            } catch (resendError) {
                console.error('Failed to sync contact to Resend:', resendError);
                // We don't fail the whole action if just Resend fails
            }
        } else {
            console.warn("Resend API Key or Audience ID missing. Contact not added to Resend audience.");
        }

        return { success: true, message: 'Thanks for joining the waitlist!' };
    } catch (error) {
        console.error('Waitlist error:', error);
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}
