'use server';

/**
 * Discord Webhook Utilities
 * Send notifications to Discord channels
 */

interface DiscordEmbed {
    title?: string;
    description?: string;
    color?: number;
    fields?: Array<{
        name: string;
        value: string;
        inline?: boolean;
    }>;
    footer?: {
        text: string;
    };
    timestamp?: string;
}

interface DiscordWebhookPayload {
    content?: string;
    embeds?: DiscordEmbed[];
    username?: string;
    avatar_url?: string;
}

/**
 * Send a message to Discord webhook
 */
async function sendToDiscord(webhookUrl: string, payload: DiscordWebhookPayload) {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Discord webhook failed: ${response.statusText}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Discord webhook error:', error);
        return { success: false, error };
    }
}

/**
 * Send visitor notification to Discord
 */
export async function notifyVisitor(data: {
    page: string;
    userAgent?: string;
    referrer?: string;
    timestamp: string;
    ip?: string;
}) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_VISITORS;

    if (!webhookUrl || webhookUrl === 'your-discord-webhook-url-for-visitors') {
        console.log('Discord visitor webhook not configured');
        return { success: false, error: 'Webhook not configured' };
    }

    const embed: DiscordEmbed = {
        title: '👤 New Visitor',
        color: 0x3b82f6, // Blue
        fields: [
            {
                name: '📄 Page',
                value: data.page,
                inline: false,
            },
            {
                name: '🌐 User Agent',
                value: data.userAgent || 'Unknown',
                inline: false,
            },
            {
                name: '🔗 Referrer',
                value: data.referrer || 'Direct',
                inline: true,
            },
            {
                name: '🌍 IP Address',
                value: data.ip || 'Unknown',
                inline: true,
            },
        ],
        footer: {
            text: 'Property360NG Visitor Tracking',
        },
        timestamp: data.timestamp,
    };

    return sendToDiscord(webhookUrl, {
        embeds: [embed],
        username: 'Property360NG Bot',
    });
}

/**
 * Send contact form submission to Discord
 */
export async function notifyContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    timestamp: string;
}) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_CONTACT;

    if (!webhookUrl || webhookUrl === 'your-discord-webhook-url-for-contact-form') {
        console.log('Discord contact webhook not configured');
        return { success: false, error: 'Webhook not configured' };
    }

    const embed: DiscordEmbed = {
        title: '📧 New Contact Form Submission',
        color: 0x10b981, // Green
        fields: [
            {
                name: '👤 Name',
                value: data.name,
                inline: true,
            },
            {
                name: '📧 Email',
                value: data.email,
                inline: true,
            },
        ],
        footer: {
            text: 'Property360NG Contact Form',
        },
        timestamp: data.timestamp,
    };

    if (data.phone) {
        embed.fields?.push({
            name: '📱 Phone',
            value: data.phone,
            inline: true,
        });
    }

    embed.fields?.push({
        name: '💬 Message',
        value: data.message.substring(0, 1000), // Discord field limit
        inline: false,
    });

    return sendToDiscord(webhookUrl, {
        embeds: [embed],
        username: 'Property360NG Bot',
    });
}

/**
 * Send application submission to Discord
 */
export async function notifyApplication(data: {
    type: string; // e.g., "Property Inquiry", "Tour Request"
    name: string;
    email: string;
    phone?: string;
    propertyTitle?: string;
    propertyId?: string;
    message?: string;
    timestamp: string;
}) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_APPLICATIONS;

    if (!webhookUrl || webhookUrl === 'your-discord-webhook-url-for-applications') {
        console.log('Discord application webhook not configured');
        return { success: false, error: 'Webhook not configured' };
    }

    const embed: DiscordEmbed = {
        title: `📝 New ${data.type}`,
        color: 0xf59e0b, // Orange
        fields: [
            {
                name: '👤 Name',
                value: data.name,
                inline: true,
            },
            {
                name: '📧 Email',
                value: data.email,
                inline: true,
            },
        ],
        footer: {
            text: 'Property360NG Applications',
        },
        timestamp: data.timestamp,
    };

    if (data.phone) {
        embed.fields?.push({
            name: '📱 Phone',
            value: data.phone,
            inline: true,
        });
    }

    if (data.propertyTitle) {
        embed.fields?.push({
            name: '🏠 Property',
            value: data.propertyTitle,
            inline: false,
        });
    }

    if (data.propertyId) {
        embed.fields?.push({
            name: '🔗 Property Link',
            value: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://property360ng.com'}/listings/${data.propertyId}`,
            inline: false,
        });
    }

    if (data.message) {
        embed.fields?.push({
            name: '💬 Message',
            value: data.message.substring(0, 1000),
            inline: false,
        });
    }

    return sendToDiscord(webhookUrl, {
        embeds: [embed],
        username: 'Property360NG Bot',
    });
}

/**
 * Send custom notification to Discord
 */
export async function notifyCustom(
    webhookType: 'visitors' | 'contact' | 'applications',
    title: string,
    fields: Array<{ name: string; value: string; inline?: boolean }>,
    color?: number
) {
    const webhookUrls = {
        visitors: process.env.DISCORD_WEBHOOK_VISITORS,
        contact: process.env.DISCORD_WEBHOOK_CONTACT,
        applications: process.env.DISCORD_WEBHOOK_APPLICATIONS,
    };

    const webhookUrl = webhookUrls[webhookType];

    if (!webhookUrl || webhookUrl.startsWith('your-discord-webhook')) {
        console.log(`Discord ${webhookType} webhook not configured`);
        return { success: false, error: 'Webhook not configured' };
    }

    const embed: DiscordEmbed = {
        title,
        color: color || 0x3b82f6,
        fields,
        footer: {
            text: 'Property360NG',
        },
        timestamp: new Date().toISOString(),
    };

    return sendToDiscord(webhookUrl, {
        embeds: [embed],
        username: 'Property360NG Bot',
    });
}
