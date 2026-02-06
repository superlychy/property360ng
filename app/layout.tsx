import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})


export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
}

export const metadata: Metadata = {
    title: 'Property360ng - Verified Nigerian Real Estate & Virtual Tours',
    description: 'Rent, buy, and invest in verified Nigerian properties with immersive 360° tours. Transparent pricing, direct agent contact, and zero drama.',
    keywords: ['real estate nigeria', 'lagos property', 'house for sale', 'estate', 'ajah', 'lekki', 'ibeju-lekki', 'ikeja', 'abuja', '360 virtual tours', 'buy house lagos', 'property360ng', 'verified listings', 'nigerian diaspora real estate'],
    authors: [{ name: 'Property360ng' }],
    openGraph: {
        title: 'Property360ng - See Lagos Properties Clearly',
        description: 'Verified properties from every angle. No blind deals. Start your 360° virtual tour today.',
        type: 'website',
        // url: 'https://property360ng.com', // Placeholder
        siteName: 'Property360ng',
        locale: 'en_NG',
        images: [
            {
                url: '/og-image.jpg', // We should probably create this later or leave generic
                width: 1200,
                height: 630,
                alt: 'Property360ng - Verified Real Estate',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Property360ng - Verified Nigerian Properties',
        description: 'Experience immersive 360° property tours in Lagos. Transparent, verified, and secure.',
        creator: '@property360ng', // Placeholder handle
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/icon.png',
        shortcut: '/icon.png',
        apple: '/icon.png',
    },
}

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
            <body className="bg-black text-white selection:bg-green-500/30">
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
