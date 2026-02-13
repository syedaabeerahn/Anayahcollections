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
}

export default function ProductManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        category: "Chairs",
        price: "",
        image: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await fetch(`/api/products/${id}`, { method: "DELETE" });
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const newProduct = await res.json();
                setProducts([...products, newProduct]);
                setIsAdding(false);
                setFormData({ name: "", category: "Chairs", price: "", image: "" });
            }
        } catch (error) {
            console.error("Failed to add product", error);
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
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) return <div>Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-serif">Product Management</h2>
                <Button onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Product</>}
                </Button>
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
                                    <option>Chairs</option>
                                    <option>Sofas</option>
                                    <option>Lighting</option>
                                    <option>Decor</option>
                                    <option>Tables</option>
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
