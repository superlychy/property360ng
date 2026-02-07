import { NextRequest, NextResponse } from 'next/server';
import { notifyContactForm } from '@/lib/utils/discord-webhook';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Send to Discord
        const result = await notifyContactForm({
            name,
            email,
            phone,
            message,
            timestamp: new Date().toISOString(),
        });

        if (!result.success) {
            console.error('Discord notification failed:', result.error);
        }

        return NextResponse.json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}
