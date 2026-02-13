import ProductGrid from "@/components/ProductGrid";

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-secondary py-12">
            <div className="container mx-auto px-4">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Collection</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Explore our meticulously crafted items, designed to bring beauty and functionality to your everyday life.
                    </p>
                </header>

                <ProductGrid />
            </div>
        </div>
    );
}
