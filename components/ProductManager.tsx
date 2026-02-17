"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    is_in_stock: boolean;
}

export default function ProductManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "Glass items",
        price: "",
        image: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products", { cache: 'no-store' });
            const data = await res.json();
            setProducts(data);
            setOriginalProducts(JSON.parse(JSON.stringify(data))); // Deep copy
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const handleToggleStock = (id: string) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, is_in_stock: !p.is_in_stock } : p
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: `temp-${Date.now()}`,
            ...formData,
            price: Number(formData.price),
            is_in_stock: true
        };
        setProducts([...products, newProduct]);
        setIsAdding(false);
        setFormData({ name: "", category: "Glass items", price: "", image: "" });
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            const productsToDelete = originalProducts.filter(op => !products.find(p => p.id === op.id));
            const productsToAdd = products.filter(p => p.id.startsWith('temp-'));
            const productsToUpdate = products.filter(p => {
                if (p.id.startsWith('temp-')) return false;
                const original = originalProducts.find(op => op.id === p.id);
                return original && (original.is_in_stock !== p.is_in_stock);
            });

            console.log("Saving changes:", { toDelete: productsToDelete.length, toAdd: productsToAdd.length, toUpdate: productsToUpdate.length });

            // Perform deletions
            for (const p of productsToDelete) {
                const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
                if (!res.ok) throw new Error(`Failed to delete product: ${p.name}`);
            }

            // Perform additions
            for (const p of productsToAdd) {
                const { id, ...data } = p;
                const res = await fetch("/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error(`Failed to add product: ${p.name}`);
            }

            // Perform updates (stock status)
            for (const p of productsToUpdate) {
                const res = await fetch(`/api/products/${p.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ is_in_stock: p.is_in_stock })
                });
                if (!res.ok) throw new Error(`Failed to update product: ${p.name}`);
            }

            alert("All changes saved successfully!");
            await fetchProducts(); // Refresh to get real IDs from DB
        } catch (error: any) {
            console.error("Failed to save changes:", error);
            alert("Error saving shifts: " + (error.message || "Unknown error"));
            fetchProducts(); // Revert local state to DB state for safety
        } finally {
            setIsSaving(false);
        }
    };

    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data
            });
            const json = await res.json();
            if (json.success) {
                setFormData({ ...formData, image: json.url });
            } else {
                throw new Error(json.error || "Upload failed");
            }
        } catch (error: any) {
            console.error("Upload failed", error);
            alert("Upload failed: " + (error.message || "Unknown error"));
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) return <div>Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-serif">Product Management</h2>
                <div className="flex gap-4">
                    {products.length !== originalProducts.length ||
                        products.some(p => p.id.startsWith('temp-')) ||
                        products.some(p => {
                            const original = originalProducts.find(op => op.id === p.id);
                            return original && original.is_in_stock !== p.is_in_stock;
                        }) ? (
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" onClick={handleSaveAll} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save All Changes"}
                        </Button>
                    ) : null}
                    <Button onClick={() => setIsAdding(!isAdding)}>
                        {isAdding ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Product</>}
                    </Button>
                </div>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border">
                    <h3 className="font-semibold mb-4">Add New Product</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                required
                                className="w-full p-2 border rounded-md"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    className="w-full p-2 border rounded-md"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Glass items</option>
                                    <option>Modern Sippers</option>
                                    <option>Spoon sets</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price (PKR)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Image</label>
                            <div className="flex gap-4 items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-primary/90"
                                    onChange={handleFileChange}
                                />
                                {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                            </div>

                            {formData.image && (
                                <div className="mt-2 relative h-32 w-32 rounded-md overflow-hidden border">
                                    <img src={formData.image} className="h-full w-full object-cover" />
                                </div>
                            )}
                            <input
                                type="hidden"
                                value={formData.image}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={uploading}>Save Product</Button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 font-medium text-gray-500">Image</th>
                            <th className="p-4 font-medium text-gray-500">Name</th>
                            <th className="p-4 font-medium text-gray-500">Category</th>
                            <th className="p-4 font-medium text-gray-500">Price</th>
                            <th className="p-4 font-medium text-gray-500">Stock Status</th>
                            <th className="p-4 font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="p-4">
                                    <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden">
                                        <img src={product.image} className="h-full w-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4 text-gray-500">{product.category}</td>
                                <td className="p-4">PKR {Number(product.price).toLocaleString()}</td>
                                <td className="p-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={product.is_in_stock ? "text-green-600 border-green-200 hover:bg-green-50" : "text-red-600 border-red-200 hover:bg-red-50"}
                                        onClick={() => handleToggleStock(product.id)}
                                    >
                                        {product.is_in_stock ? "In Stock" : "Out of Stock"}
                                    </Button>
                                </td>
                                <td className="p-4">
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(product.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">No products found. Add one above.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
