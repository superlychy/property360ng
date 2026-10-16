import Link from 'next/link'

export default function DiasporaPage() {
    return (
        <div className="min-h-screen pt-28 pb-20">
            <section className="container-custom mx-auto max-w-5xl px-4 sm:px-6">
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-400">
                        Property360ng
                    </p>
                    <h1 className="mb-6 text-4xl font-bold leading-tight font-display sm:text-5xl">
                        Explore Nigerian properties from abroad
                    </h1>
                    <p className="mb-10 text-lg leading-relaxed text-gray-300 sm:text-xl">
                        Browse available listings, review their photos and details, and contact us to ask
                        questions or arrange an in-person inspection. A virtual tour is available only on
                        listings that include one.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link href="/listings" className="btn-primary justify-center text-center">
                            Browse properties
                        </Link>
                        <Link href="/contact" className="btn-outline justify-center text-center">
                            Ask us a question
                        </Link>
                    </div>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-3">
                    {[
                        {
                            step: '01',
                            title: 'Browse listings',
                            description: 'Check each property’s location, price, photos, and listed details.',
                        },
                        {
                            step: '02',
                            title: 'Ask for current details',
                            description: 'Contact the team to confirm availability and arrange the next steps.',
                        },
                        {
                            step: '03',
                            title: 'Inspect before deciding',
                            description: 'Use a tour when one is available, and arrange an in-person inspection before making a commitment.',
                        },
                    ].map((item) => (
                        <article key={item.step} className="rounded-2xl border border-white/10 bg-gray-900 p-6 sm:p-8">
                            <p className="mb-4 text-sm font-bold tracking-widest text-green-400">{item.step}</p>
                            <h2 className="mb-3 text-xl font-semibold text-white">{item.title}</h2>
                            <p className="leading-relaxed text-gray-400">{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
