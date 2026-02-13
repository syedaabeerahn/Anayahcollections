import { NextResponse } from 'next/server';
import { deleteProduct } from '@/lib/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await deleteProduct(params.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
