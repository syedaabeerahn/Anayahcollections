import { NextResponse } from 'next/server';
import { deleteProduct, updateProduct } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updatedProduct = await updateProduct(params.id, body);
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await deleteProduct(params.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
