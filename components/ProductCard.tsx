"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { Check } from "lucide-react";
import { useState } from "react";

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({ ...product, quantity: 1 });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
            <Link href={`/product/${product.id}`}>
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>
            {/* Quick Add Overlay */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 p-4 transition-transform duration-300 group-hover:translate-y-0 backdrop-blur-sm z-10">
                <Button className="w-full" onClick={(e) => { e.preventDefault(); handleAddToCart(); }} disabled={added}>
                    {added ? <><Check className="mr-2 h-4 w-4" /> Added</> : "Add to Cart"}
                </Button>
            </div>
            <div className="p-4">
                <p className="mb-1 text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-accent font-serif">{product.name}</h3>
                </Link>
                <p className="mt-1 font-semibold text-gray-900">PKR {product.price.toLocaleString()}</p>
            </div>
        </div>
    );
}
