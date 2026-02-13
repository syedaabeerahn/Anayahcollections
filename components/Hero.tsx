import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900 text-white">
            {/* Background Image Placeholder */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
                <h1 className="mb-6 font-serif text-5xl font-bold leading-tight md:text-7xl">
                    Elevate Your Space <br /> With Timeless Elegance
                </h1>
                <p className="mb-8 max-w-2xl text-lg text-gray-200 md:text-xl">
                    Discover our curated collection of premium furniture and decor designed to transform your home into a sanctuary of style.
                </p>
                <div className="flex gap-4">
                    <Button size="lg" className="bg-accent text-white hover:bg-accent/90 border-none" asChild>
                        <Link href="/shop">Shop Collection</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                        <Link href="/about">Our Story</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
