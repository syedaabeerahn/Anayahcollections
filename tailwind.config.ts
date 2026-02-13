import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1a1a1a", // Deep black/charcoal
                secondary: "#f5f5f5", // Light grey/off-white
                accent: "#d4af37", // Gold accent for premium feel
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                serif: ["var(--font-playfair)"],
            },
        },
    },
    plugins: [],
};
export default config;
