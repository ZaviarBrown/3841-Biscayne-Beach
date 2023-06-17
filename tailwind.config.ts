import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "3xl": "0 6px 16px rgba(0,0,0,0.5)",
                "4xlR": "10px 20px 16px rgba(0,0,0,1)",
                "4xlL": "-10px 20px 16px rgba(0,0,0,1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
