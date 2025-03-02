import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        verdePrincipal: "#6D6D47",
        amarilloResaltado: "#EEC623",
        naranjaComplementario: "#E8911C",
        blancoNeutro: "#FFFFFF",
        negroNeutro: "#000000",
        ctaVerdeOscuro: "#505033",
        ctaAmarilloLuminoso: "#FFDA3A",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        lora: ["Lora", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
