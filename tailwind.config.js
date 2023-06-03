/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transform: {
        // "rotate-45": "rotate(45deg)",
      },
      colors: {
        dark: "#1b1b1b",
        light: "#fff",
        primary: "#D3D6E9", // 240,86,199
        background: "#ebdbff",
        primaryDark: "#58E6D9", // 80,230,217
        coffee: "#f0e7db",
        opaque: "#ffffff40",
        brand: "#1582CC",
        brandDark: "#00d5ff",
        brandPurple: "#ebdbff",
        brandWhite: "#fff",
        brandGray: "#f5f7ff",
        brandBlue: "#F9FEFF",
        brandBlue2: "#dbeefd",
        purp: "#D3D6E9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "div-background": "url('/proverbs.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
