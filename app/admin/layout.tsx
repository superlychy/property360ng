
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
        {
            label: 'Dashboard',
            href: '/admin',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        },
        {
            label: 'Listings',
            href: '/admin/listings',
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        },
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
                    {isSidebarOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
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
                            <h1 className="text-xl font-bold text-white">
                                Property<span className="text-green-500">360ng</span>
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
                                                ? 'bg-green-500/10 text-green-400 font-medium'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }
                    `}
                                    >
                                        {item.icon}
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
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-black p-6 md:p-10">
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
