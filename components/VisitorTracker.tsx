'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Visitor Tracking Component
 * Tracks page visits and sends notifications to Discord
 */
export default function VisitorTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Only track on client side
        if (typeof window === 'undefined') return;

        // Don't track admin pages
        if (pathname?.startsWith('/admin')) return;

        // Track the visit
        const trackVisit = async () => {
            try {
                await fetch('/api/track-visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        page: pathname || '/',
                        userAgent: navigator.userAgent,
                        referrer: document.referrer,
                        timestamp: new Date().toISOString(),
                    }),
                });
            } catch (error) {
                // Silently fail - don't disrupt user experience
                console.debug('Visitor tracking failed:', error);
            }
        };

        // Track after a short delay to avoid blocking page load
        const timeout = setTimeout(trackVisit, 1000);

        return () => clearTimeout(timeout);
    }, [pathname]);

    // This component doesn't render anything
    return null;
}
