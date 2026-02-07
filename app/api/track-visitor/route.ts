import { NextRequest, NextResponse } from 'next/server';
import { notifyVisitor } from '@/lib/utils/discord-webhook';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page, userAgent, referrer, timestamp } = body;

        // Get IP address
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'Unknown';

        // Send to Discord
        await notifyVisitor({
            page,
            userAgent,
            referrer,
            timestamp,
            ip,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Visitor tracking error:', error);
        // Return success anyway to not disrupt user experience
        return NextResponse.json({ success: true });
    }
}
