/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary-rgb))',
        },
        danger: {
          DEFAULT: 'rgb(var(--danger-rgb))',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning-rgb))',
        },
        success: {
          DEFAULT: 'rgb(var(--success-rgb))',
        },
        info: {
          DEFAULT: 'rgb(var(--info-rgb))',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}
