import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Property360ng - Verified Real Estate'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* We simulate the logo text here since loading local fonts/images in Edge can be complex without setup */}
                    <div style={{ fontSize: 80, fontWeight: 900, color: 'white', display: 'flex' }}>
                        Property<span style={{ color: '#4ade80' }}>360ng</span>
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 32,
                        color: '#9ca3af',
                        marginTop: 30,
                        textAlign: 'center',
                        maxWidth: '80%',
                        lineHeight: 1.4,
                    }}
                >
                    Verified Properties • Immersive 360° Tours • Zero Drama
                </div>
                <div style={{
                    display: 'flex',
                    marginTop: 50,
                    background: '#22c55e',
                    color: 'black',
                    padding: '10px 30px',
                    borderRadius: 50,
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>
                    View Listings
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
