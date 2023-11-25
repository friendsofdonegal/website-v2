import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.5rem" }],
            base: ["1rem", { lineHeight: "1.75rem" }],
            lg: ["1.125rem", { lineHeight: "2rem" }],
            xl: ["1.25rem", { lineHeight: "2rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["2rem", { lineHeight: "2.5rem" }],
            "4xl": ["2.5rem", { lineHeight: "3.5rem" }],
            "5xl": ["3rem", { lineHeight: "3.5rem" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1.1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        colors: {
            green: {
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
            blue: {
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
            heading: [...defaultTheme.fontFamily.sans],
            body: [...defaultTheme.fontFamily.sans],
            sans: [...defaultTheme.fontFamily.sans],
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
            maxWidth: {
                "2xl": "40rem",
            },
        },
    },
};

export default config;
