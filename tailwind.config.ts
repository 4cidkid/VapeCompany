import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#6ac0f6",
        "primary-200": "#51b6f5",
        "primary-300": "#39abf3",
        "primary-400": "#20a1f2",
        "primary-500": "#0796F0",
        "primary-600": "#0687d8",
        "primary-700": "#0678c0",
        "primary-800": "#0569a8",
        background: "#0569a8",
        "background-light": "#F7F7F7",
        "text-black": "#131313",
        text: "#111827"

      }
    },
  },
  plugins: [
    function ({ addVariant }: any) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}
export default config
