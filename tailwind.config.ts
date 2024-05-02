import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      mmd: { max: "768px" },
      lg: "1140px",
      xl: "1512px",
    },
    extend: {
      fontSize: {
        "2xl": "48px",
        xl: "32px",
        lg: "24px",
        md: "20px",
        base: "14px",
      },
      colors: {
        primary: "#333232",
        second: "#2C2B2B",
        background: "#F1F1F1",
        blue: "#416FF2",
        green: "#5AB352",
        gray: "#767272",
        lightGray: "#F1F1F1",
        link: "#00258F",
        red: "#f44242",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};
export default config;
