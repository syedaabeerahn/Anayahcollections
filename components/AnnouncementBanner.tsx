"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { usePathname } from "next/navigation";

export function AnnouncementBanner() {
    const [settings, setSettings] = useState<{ text: string, enabled: boolean } | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data.announcement);
            })
            .catch(error => {
                console.error("Error fetching announcement:", error);
            });
    }, []);

    // Only show on the homepage
    if (pathname !== "/") {
        return null;
    }

    if (!settings || !settings.enabled || !settings.text) {
        return null;
    }

    return (
        <div className="bg-accent text-white py-2.5 px-4 shadow-sm relative z-50 overflow-hidden">
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

            <div className="container mx-auto flex items-center justify-center gap-3">
                <Megaphone className="h-4 w-4 animate-bounce" />
                <p className="text-sm font-medium tracking-wide text-center uppercase">
                    {settings.text}
                </p>
                <Megaphone className="h-4 w-4 animate-bounce hidden sm:block" />
            </div>
        </div>
    );
}

// Global styles for the shimmer effect - added via globals.css usually, but can be inline here for simplicity
// Or just let it be without shimmer if not defined in tailwind.
