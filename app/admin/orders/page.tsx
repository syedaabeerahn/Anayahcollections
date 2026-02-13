"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, User, Clock, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    customer: string;
    items: OrderItem[];
    total: number;
    timestamp: string;
    city: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            // Sort by latest first
            setOrders(data.reverse());
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Checkout Clicks</h2>
                    <p className="text-gray-500">View people who clicked the checkout button</p>
                </div>
                <Button onClick={fetchOrders} variant="outline" className="flex items-center gap-2">
                    Refresh List
                </Button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No checkout clicks yet</h3>
                    <p className="text-gray-500">Wait for users to start checking out from your store.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-accent/30 transition-colors">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <User className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</p>
                                            <h3 className="text-xl font-bold text-gray-900">{order.customer}</h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">
                                                {new Date(order.timestamp).toLocaleString('en-PK', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short'
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-lg font-bold text-accent">Total: PKR {order.total.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <Package className="h-4 w-4" />
                                            Order Details
                                        </h4>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">
                                                        {item.name} <span className="text-gray-400">x{item.quantity}</span>
                                                    </span>
                                                    <span className="font-medium">PKR {(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-sm italic text-gray-500">
                                                <span>Delivery Charge ({order.city})</span>
                                                <span>PKR 250</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 flex items-center gap-2">
                                    View on WhatsApp <ExternalLink className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
