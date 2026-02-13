"use client";

import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
}

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setFeaturedProducts(data.slice(0, 3));
            })
            .catch(console.error);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Featured Collection</h2>
                            <p className="text-gray-500">Handpicked pieces for the discerning tastes.</p>
                        </div>
                        <Link href="/shop" className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
                            View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="text-center col-span-3 text-gray-400">Loading products...</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Join Our Mailing List</h2>
                    <div className="flex gap-4 justify-center">
                        <Link href="/shop" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
                            Shop Collection
                        </Link>
                        <a
                            href="https://wa.me/923142003235"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                    <form className="flex max-w-md mx-auto gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button className="bg-primary text-secondary px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
