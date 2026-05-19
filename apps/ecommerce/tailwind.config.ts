import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: 'hsl(24 95% 53%)', foreground: 'hsl(0 0% 100%)' },
            },
        },
    },
    plugins: [],
}
export default config
