
import ListingForm from '@/components/admin/ListingForm'

export default function NewListingPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">New Listing</h1>
                <p className="text-gray-400">Create a new property listing to start adding virtual tours.</p>
            </div>

            <ListingForm />
        </div>
    )
}
