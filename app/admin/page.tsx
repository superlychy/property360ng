
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
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-400 text-3xl">
                            +
                        </div>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400">Create Listing</h3>
                        <p className="text-sm text-gray-500">Add a new property to your portfolio</p>
                    </div>
                </Link>

                {/* Manage Listings Card */}
                <Link href="/admin/listings" className="card hover:border-blue-500/50 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 text-xl">
                            🏠
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
                        <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 text-xl">
                            🎨
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
                        <div className="p-3 rounded-lg bg-green-500/10 text-green-400 text-xl">
                            📊
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
