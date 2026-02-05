import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPagesList() {
    const supabase = await createClient()

    const { data: pages } = await supabase
        .from('pages')
        .select('*')
        .order('title')

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 font-display">Manage Site Content</h1>

            <div className="grid gap-6">
                {pages?.map((page) => (
                    <div key={page.id} className="bg-gray-900 border border-white/10 rounded-xl p-6 flex justify-between items-center group hover:border-green-500/50 transition-colors">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{page.title}</h2>
                            <p className="text-gray-500 text-sm">/{page.slug}</p>
                        </div>
                        <Link
                            href={`/admin/pages/${page.id}`}
                            className="px-6 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                        >
                            Edit Content
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
