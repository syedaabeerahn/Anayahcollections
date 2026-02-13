import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-primary">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                        We'd love to hear from you
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Details */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Contact Information</h2>
                                <p className="text-gray-600 mb-8">
                                    Have questions about our products or need assistance? Reach out to us through any of the following channels.
                                </p>
                            </div>

                            {/* Phone/WhatsApp */}
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <Phone className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Phone / WhatsApp</h3>
                                    <a
                                        href="https://wa.me/923142003235"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-accent transition-colors flex items-center gap-2"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        +92 314 2003235
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <Mail className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <a
                                        href="mailto:info@anayahcollections.com"
                                        className="text-primary hover:text-accent transition-colors"
                                    >
                                        info@anayahcollections.com
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <MapPin className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                                    <p className="text-gray-600">Karachi, Pakistan</p>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.facebook.com/share/1BhgeMJ2CW/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors"
                                    >
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/anayahcollections?igsh=eTJxbXVrNmVhZXNy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors"
                                    >
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="bg-secondary py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Prefer to Chat?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Connect with us directly on WhatsApp for instant support and product inquiries.
                    </p>
                    <a
                        href="https://wa.me/923142003235"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-medium"
                    >
                        <MessageCircle className="h-5 w-5" />
                        Chat on WhatsApp
                    </a>
                </div>
            </section>
        </div>
    );
}
