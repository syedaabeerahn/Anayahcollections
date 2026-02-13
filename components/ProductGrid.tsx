"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-12">Loading collection...</div>;

    if (products.length === 0) return <div className="text-center py-12 text-gray-500">No products available.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
