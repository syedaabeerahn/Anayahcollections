"use client";

import ProductManager from "@/components/ProductManager";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>

            {/* We can keep stats static or dynamic later, but prioritizing product management */}
            <ProductManager />
        </div>
    );
}
