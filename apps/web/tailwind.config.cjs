const sharedConfig = require("@fod/tailwind-config/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [sharedConfig],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    plugins: [require("@tailwindcss/forms")],
};
