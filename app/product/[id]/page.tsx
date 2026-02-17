"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
}

export default function ProductPage() {
    const params = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then((data: Product[]) => {
                const found = data.find(p => p.id === params.id);
                setProduct(found || null);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [params.id]);

    const handleAddToCart = () => {
        if (product) {
            addItem({ ...product, quantity: 1 });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading details...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4">
                <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery (Simplified) */}
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                                <Star className="h-4 w-4 fill-current" />
                            </div>
                            <span className="text-sm text-gray-500">(12 reviews)</span>
                        </div>

                        <p className="text-2xl font-medium text-gray-900 mb-8">PKR {Number(product.price).toLocaleString()}</p>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Experience the perfect blend of style and comfort with our {product.name}.
                            Meticulously crafted to enhance your living space, this piece exemplifies
                            our commitment to quality and timeless design.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <ShieldCheck className="h-5 w-5 text-gray-400" />
                                <span>2-year warranty included</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={added}>
                                {added ? <><Check className="mr-2 h-4 w-4" /> Added</> : "Add to Cart"}
                            </Button>
                            <Button size="lg" variant="outline">Save for Later</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
