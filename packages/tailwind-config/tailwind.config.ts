import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...colors,
      brand: {
        50: "#EAF6E9",
        100: "#D1ECCF",
        200: "#A7DBA3",
        300: "#79C974",
        400: "#4EB446",
        500: "#398534",
        600: "#2E6A2A",
        700: "#235120",
        800: "#183715",
        900: "#0B1A0A",
        950: "#060F06",
      },
      blue: {
        50: "#E1EEF9",
        100: "#C3DDF4",
        200: "#8BBDE9",
        300: "#4F9BDE",
        400: "#257BC5",
        500: "#1A568A",
        600: "#154570",
        700: "#0F3352",
        800: "#0B2338",
        900: "#05101A",
        950: "#02080D",
      },
      teal: {
        50: "#EDF7F8",
        100: "#D7EEEF",
        200: "#AFDCDF",
        300: "#8BCDD0",
        400: "#63BBC0",
        500: "#43A2A7",
        600: "#368387",
        700: "#296366",
        800: "#1A4041",
        900: "#0D2021",
        950: "#071212",
      },
      gold: {
        50: "#FAF8F5",
        100: "#F3F0E7",
        200: "#E7E3D0",
        300: "#DBD8B8",
        400: "#CDCFA1",
        500: "#BBC38A",
        600: "#A9AC5D",
        700: "#837F43",
        800: "#58512D",
        900: "#2C2616",
        950: "#18130C",
      },
      cream: {
        50: "#FCFCFC",
        100: "#FAFAFA",
        200: "#F7F7F7",
        300: "#F4F3F1",
        400: "#F1F0E9",
        500: "#EEEFE1",
        600: "#EAF0D9",
        700: "#CCCFA5",
        800: "#A9A47A",
        900: "#736B59",
        950: "#535250",
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};

export default config;
