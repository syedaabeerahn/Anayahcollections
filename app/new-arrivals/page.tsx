"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
}

export default function NewArrivalsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                // Show the most recently added products (last 6 items)
                const recentProducts = data.slice(-6).reverse();
                setProducts(recentProducts);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-gray-800 to-accent">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
                <div className="relative z-10 text-center text-white px-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                        <h1 className="text-5xl md:text-6xl font-serif font-bold">New Arrivals</h1>
                        <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                    </div>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                        Discover our latest collection of premium pieces
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                            Fresh Additions to Our Collection
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Be the first to explore our newest arrivals. Each piece is carefully selected to bring elegance and style to your space.
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary"></div>
                            <p className="mt-4 text-gray-500">Loading new arrivals...</p>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No new arrivals at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-secondary py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                        Looking for More?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Explore our full collection for even more stunning pieces.
                    </p>
                    <a
                        href="/shop"
                        className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium"
                    >
                        View All Products
                    </a>
                </div>
            </section>
        </div>
    );
}
