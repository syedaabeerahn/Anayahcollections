import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'announcement')
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // Record not found
                return NextResponse.json({ announcement: { text: "", enabled: false } });
            }
            throw error;
        }

        return NextResponse.json(data.value);
    } catch (error) {
        console.error("Error reading settings:", error);
        return NextResponse.json({ announcement: { text: "", enabled: false } });
    }
}

export async function POST(request: Request) {
    try {
        const newSettings = await request.json();

        const { error } = await supabase
            .from('settings')
            .upsert({ key: 'announcement', value: newSettings })
            .select();

        if (error) throw error;

        return NextResponse.json(newSettings);
    } catch (error) {
        console.error("Error saving settings:", error);
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
    }
}
