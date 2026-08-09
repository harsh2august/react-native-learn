/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#004A98",
                secondary: "#FDC700",
                accent: "#10B981",
                background: "#F3F4F6",
                text: "#111827"
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Merriweather", "serif"],
                mono: ["Fira Code", "monospace"]
            }
        },
    },
    plugins: [],
}