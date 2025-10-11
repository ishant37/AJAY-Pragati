/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B57A4',
          light: '#3d7bc1',
          dark: '#073d73',
          50: '#e8f0f8',
          100: '#d1e1f1',
          200: '#a3c3e3',
          300: '#75a5d5',
          400: '#4787c7',
          500: '#0B57A4',
          600: '#094683',
          700: '#073462',
          800: '#052341',
          900: '#021121',
        },
        secondary: {
          DEFAULT: '#2E7D32',
          light: '#5aa54f',
          dark: '#1f5722',
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#2E7D32',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        success: {
          DEFAULT: '#4caf50',
          light: '#80e27e',
          dark: '#087f23',
        },
        warning: {
          DEFAULT: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
        },
        error: {
          DEFAULT: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
        },
        info: {
          DEFAULT: '#2196f3',
          light: '#64b5f6',
          dark: '#1976d2',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.05)',
        'DEFAULT': '0 4px 8px rgba(0,0,0,0.08)',
        'md': '0 6px 12px rgba(0,0,0,0.1)',
        'lg': '0 8px 16px rgba(0,0,0,0.12)',
        'xl': '0 12px 24px rgba(0,0,0,0.15)',
        '2xl': '0 16px 32px rgba(0,0,0,0.18)',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'card': '12px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
