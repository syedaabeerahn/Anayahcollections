import { supabase } from './supabase';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
}

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data as Product[];
}

export async function addProduct(product: Omit<Product, 'id'>) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) {
        console.error('Error adding product:', error);
        throw error;
    }
    return data;
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
