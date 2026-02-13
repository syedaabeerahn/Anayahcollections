"use client";
// Force rebuild

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartSidebar() {
    const { isCartOpen, toggleCart, items, removeItem, updateQuantity, cartTotal } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                    onClick={toggleCart}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-serif font-bold">Shopping Cart</h2>
                        <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4">
                                    <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                                            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm font-semibold mb-2">PKR {Number(item.price).toLocaleString()}</p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="p-1 border rounded hover:bg-gray-50"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                                            <button
                                                className="p-1 border rounded hover:bg-gray-50"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-bold">PKR {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                            <span>Delivery (Karachi)</span>
                            <span>PKR 250</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center italic">
                            Delivery charge is PKR 250 for Karachi. <br />
                            Other cities: Advance payment only.
                        </p>
                        <Button
                            className="w-full text-white"
                            disabled={items.length === 0}
                            onClick={async () => {
                                const userEmail = localStorage.getItem("userEmail") || "Guest";
                                const orderPayload = {
                                    customer: userEmail,
                                    items: items.map(item => ({
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        quantity: item.quantity
                                    })),
                                    total: cartTotal + 250, // Including Karachi delivery
                                    city: "Karachi" // Default as per requirements
                                };

                                // Record order in background
                                try {
                                    await fetch("/api/orders", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(orderPayload)
                                    });
                                } catch (error) {
                                    console.error("Failed to record order:", error);
                                }

                                const message = `Halo, saya ingin memesan:\n${items.map(item => `- ${item.name} (${item.quantity}x) - PKR ${item.price}`).join('\n')}\n\nSubtotal: PKR ${cartTotal.toLocaleString()}\nDelivery (Karachi): PKR 250\n\n*Total (Karachi): PKR ${(cartTotal + 250).toLocaleString()}*\n\n(Note: Advance payment required for outside Karachi)`;
                                window.open(`https://wa.me/923142003235?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                        >
                            Checkout via WhatsApp
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
