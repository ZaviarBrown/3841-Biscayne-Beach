import { type Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                book: '852px',
            },
            boxShadow: {
                '3xl': '0 6px 16px rgba(0,0,0,0.5)',
                '3xl-white': '0 0 16px white',
                '4xl': '0 0 16px black',
                '4xlR': '10px 0px 16px rgba(0,0,0,0.5)',
                '4xlL': '-10px 0px 16px rgba(0,0,0,0.5)',
            },
        },
    },
    plugins: [],
} satisfies Config;
