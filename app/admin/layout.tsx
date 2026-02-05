
'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'Listings', href: '/admin/listings', icon: '🏠' },
        // Only showing implemented features for now
        // { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
    ]

    return (
        <div className="min-h-screen bg-black">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-gray-900">
                <span className="font-bold text-lg">Admin Panel</span>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-400 hover:text-white"
                >
                    {isSidebarOpen ? '✖' : '☰'}
                </button>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`
            fixed md:static inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-white/10 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
                >
                    <div className="flex flex-col h-full p-4">
                        <div className="mb-8 px-2">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Real Estate 360
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
                        </div>

                        <nav className="flex-1 space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                      ${isActive
                                                ? 'bg-blue-500/10 text-blue-400 font-medium'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }
                    `}
                                    >
                                        <span>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="pt-4 border-t border-white/10">
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <span>🚪</span>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-black p-4 md:p-8">
                    {children}
                </main>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </div>
    )
}
