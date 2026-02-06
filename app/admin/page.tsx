
import Link from 'next/link'

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome back to your real estate control center.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Listing Card */}
                <Link
                    href="/admin/listings/new"
                    className="group relative overflow-hidden card border-dashed border-2 border-gray-700 bg-transparent hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-300 flex items-center justify-center min-h-[200px]"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400">Create Listing</h3>
                        <p className="text-sm text-gray-500">Add a new property to your listings</p>
                    </div>
                </Link>

                {/* Manage Listings Card */}
                <Link href="/admin/listings" className="card hover:border-blue-500/50 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                            Manage
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">My Listings</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        View and manage all your property listings, scenes, and hotspots.
                    </p>
                    <div className="text-blue-400 text-sm font-medium flex items-center gap-2">
                        View All <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                {/* Homepage Banner Card */}
                <Link href="/admin/banner" className="card hover:border-blue-500/50 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-400 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-colors">
                            Customize
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Homepage Banner</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Customize the hero banner on your homepage with images and text.
                    </p>
                    <div className="text-blue-400 text-sm font-medium flex items-center gap-2">
                        Manage Banner <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </Link>

                {/* Stats Placeholder */}
                <div className="card opacity-75">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Visitor stats and engagement metrics coming soon.
                    </p>
                    <div className="text-gray-600 text-sm">
                        Coming Soon
                    </div>
                </div>
            </div>
        </div>
    )
}
