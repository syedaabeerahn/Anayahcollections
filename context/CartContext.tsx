"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    setUserEmail: (email: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Initial load and user detection
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        setUserEmail(storedEmail);

        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
        setIsMounted(true);
    }, []);

    // Fetch from Supabase when user is detected
    useEffect(() => {
        if (userEmail) {
            fetchRemoteCart(userEmail);
        }
    }, [userEmail]);

    const fetchRemoteCart = async (email: string) => {
        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select(`
                    quantity,
                    products (id, name, price, image)
                `)
                .eq('user_email', email);

            if (error) throw error;

            if (data && data.length > 0) {
                const remoteItems: CartItem[] = data.map((d: any) => ({
                    id: d.products.id,
                    name: d.products.name,
                    price: d.products.price,
                    image: d.products.image,
                    quantity: d.quantity
                }));

                // Merge with local items (prioritize remote for now)
                setItems(remoteItems);
            }
        } catch (error) {
            console.error("Error fetching remote cart:", error);
        }
    };

    // Sync to Supabase whenever items change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart", JSON.stringify(items));
            if (userEmail) {
                syncRemoteCart(userEmail, items);
            }
        }
    }, [items, isMounted, userEmail]);

    const syncRemoteCart = async (email: string, currentItems: CartItem[]) => {
        try {
            // This is a simple implementation: clear and re-insert
            // A more optimized version would use upsert or compare diffs

            // Delete existing
            await supabase.from('cart_items').delete().eq('user_email', email);

            // Insert new items
            if (currentItems.length > 0) {
                const toInsert = currentItems.map(item => ({
                    user_email: email,
                    product_id: item.id,
                    quantity: item.quantity
                }));
                await supabase.from('cart_items').insert(toInsert);
            }
        } catch (error) {
            console.error("Error syncing remote cart:", error);
        }
    };

    const addItem = (newItem: CartItem) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...newItem, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                isCartOpen,
                toggleCart,
                setUserEmail,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
