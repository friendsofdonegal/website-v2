const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,astro}"],
    theme: {
        colors: {
            apple: {
                50: "#f4faf3",
                100: "#e5f5e3",
                200: "#cbeac8",
                300: "#a0d99c",
                400: "#6fbe6a",
                500: "#4da747",
                600: "#398534",
                700: "#2f692c",
                800: "#295427",
                900: "#224621",
                950: "#0f250e",
            },
            "havelock-blue": {
                50: "#f2f8fd",
                100: "#e4effa",
                200: "#c4def3",
                300: "#8fc3ea",
                400: "#61abdf",
                500: "#2e89c9",
                600: "#1e6cab",
                700: "#1a568a",
                800: "#194b73",
                900: "#1a3f60",
                950: "#112840",
            },
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
        },
        fontFamily: {
            heading: ["Roboto", ...defaultTheme.fontFamily.sans],
            body: ["Nunito", ...defaultTheme.fontFamily.sans],
            sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            serif: [...defaultTheme.fontFamily.serif],
        },
        extend: {
            spacing: {
                "8xl": "96rem",
                "9xl": "128rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
};
