"use client";
// Force rebuild

import Link from "next/link";
import { ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";

export function Navbar() {
    const { cartCount, toggleCart } = useCart();
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <Link href="/" className="text-2xl font-serif font-bold text-gray-900 tracking-wide">
                        ANAYAH <span className="text-accent font-light">COLLECTIONS</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
                        Home
                    </Link>
                    <Link href="/shop" className="text-sm font-medium hover:text-accent transition-colors">
                        Shop
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/account">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                        <ShoppingBag className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
                                {cartCount}
                            </span>
                        )}
                        <span className="sr-only">Cart</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
