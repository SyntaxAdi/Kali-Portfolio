/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
            animation: {
                "rainbow": "rainbow var(--speed, 2s) infinite linear",
            },
            keyframes: {
                rainbow: {
                    "0%": { "background-position": "0%" },
                    "100%": { "background-position": "200%" },
                },
            }
        },
    },
    plugins: [],
}
