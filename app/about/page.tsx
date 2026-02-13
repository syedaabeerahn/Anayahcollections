import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2670&auto=format&fit=crop")' }}
                />
                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Story</h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                        Crafting spaces that tell your unique story through timeless design and unparalleled quality.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">The Anayah Philosophy</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-12">
                        At Anayah Collections, we believe that your home is a reflection of your soul.
                        Founded with a passion for exquisite aesthetics and functional artistry, we curate pieces
                        that bridge the gap between modern minimalism and classic elegance. Every item in our collection
                        is chosen for its ability to inspire, comfort, and endure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h3 className="font-serif text-xl font-bold mb-4">Quality First</h3>
                            <p className="text-gray-500">We partner with artisans who share our commitment to exceptional craftsmanship.</p>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl font-bold mb-4">Timeless Design</h3>
                            <p className="text-gray-500">Trends fade, but true style is eternal. Our pieces are designed to last a lifetime.</p>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl font-bold mb-4">Sustainable Luxury</h3>
                            <p className="text-gray-500">Mindful sourcing and responsible practices are at the heart of what we do.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Delivery Policy Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto max-w-4xl text-center px-4">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Shipping & Delivery Policies</h2>
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="text-left">
                                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Karachi Delivery</h3>
                                <p className="text-gray-600">
                                    We offer a flat shipping rate of <strong>PKR 250</strong> for all orders within Karachi.
                                    Cash on Delivery (COD) is available.
                                </p>
                            </div>
                            <div className="text-left">
                                <h3 className="font-serif text-xl font-bold mb-2 text-primary">Nationwide Delivery</h3>
                                <p className="text-gray-600">
                                    For cities outside Karachi, we require <strong>Advance Payment</strong>.
                                    Shipping charges will be calculated based on weight and destination.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-secondary py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Have a question about a product or need design advice? Our team is here to help you create your dream space.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
