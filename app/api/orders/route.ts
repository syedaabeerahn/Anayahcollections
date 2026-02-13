import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading orders:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const orderData = await request.json();

        const { data, error } = await supabase
            .from('orders')
            .insert([{
                ...orderData,
                timestamp: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error("Error saving order:", error);
        return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }
}
