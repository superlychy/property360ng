export default function ContactPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="container-custom">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-400 font-light">
                        Have questions about a property or want to partner with us? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="bg-gray-900 border border-white/5 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                                <select className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all">
                                    <option>General Inquiry</option>
                                    <option>Property Listing</option>
                                    <option>Partnership</option>
                                    <option>Support</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                <textarea className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-green-500 outline-none transition-all h-32" placeholder="Tell us more..."></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 text-center justify-center">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-6 text-gray-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        ✉️
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Email</p>
                                        <p>Contact@property360ng.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        📞
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Phone</p>
                                        <p>+234 707 279 5393</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                        📍
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Office</p>
                                        <p>12 Obong street, Royal Gardens Ajah,</p>
                                        <p>Lagos, Nigeria</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-gray-900 rounded-2xl border border-white/5 flex items-center justify-center">
                            <span className="text-gray-600">Map Integration Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
