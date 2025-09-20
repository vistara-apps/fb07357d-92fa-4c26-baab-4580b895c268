/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(230 15% 8%)',
        surface: 'hsl(230 15% 15%)',
        accent: 'hsl(30 90% 60%)',
        primary: 'hsl(240 90% 60%)',
        'text-primary': 'hsl(230 10% 95%)',
        'text-secondary': 'hsl(230 10% 70%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      spacing: {
        'xl': '24px',
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0, 0%, 60%, 0.1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'dance-bounce': 'dance-bounce 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'dance-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
