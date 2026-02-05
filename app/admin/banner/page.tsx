import { createClient } from '@/lib/supabase/server'
import BannerForm from '@/components/admin/BannerForm'
import { redirect } from 'next/navigation'

export default async function BannerManagementPage() {
    const supabase = await createClient()

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // Fetch existing banner
    const { data: banner } = await supabase
        .from('homepage_banner')
        .select('*')
        .single()

    return (
        <div className="min-h-screen py-12">
            <div className="container-custom max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Homepage Banner</h1>
                    <p className="text-gray-400">Manage the hero banner on your homepage</p>
                </div>

                <BannerForm initialData={banner} />
            </div>
        </div>
    )
}
