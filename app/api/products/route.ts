import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/db';

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, price, category, image } = body;

    if (!name || !price || !category || !image) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const newProduct = await addProduct({ name, price: Number(price), category, image });
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    }
}
