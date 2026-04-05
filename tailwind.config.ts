import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0d0d0f',
          2: '#131316',
          3: '#1a1a1f',
        },
        surface: {
          DEFAULT: '#1e1e24',
          2: '#252530',
        },
        border: {
          DEFAULT: '#2a2a35',
          2: '#353545',
        },
        accent: {
          DEFAULT: '#7c6fff',
          2: '#ff6b9d',
          3: '#00d4aa',
          4: '#ffb347',
        },
        ink: {
          DEFAULT: '#e8e8f0',
          2: '#9090a8',
          3: '#5a5a72',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e8e8f0',
            maxWidth: 'none',
            a: { color: '#7c6fff', textDecoration: 'none', '&:hover': { color: '#9580ff' } },
            h1: { color: '#e8e8f0', fontFamily: 'var(--font-syne)' },
            h2: { color: '#e8e8f0', fontFamily: 'var(--font-syne)' },
            h3: { color: '#e8e8f0', fontFamily: 'var(--font-syne)' },
            h4: { color: '#e8e8f0' },
            strong: { color: '#e8e8f0' },
            code: {
              color: '#00d4aa',
              backgroundColor: '#1a1a1f',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.875em',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
            pre: {
              backgroundColor: '#131316',
              border: '1px solid #2a2a35',
              borderRadius: '12px',
              code: { backgroundColor: 'transparent', color: 'inherit', padding: 0 },
            },
            blockquote: {
              borderLeftColor: '#7c6fff',
              color: '#9090a8',
            },
            hr: { borderColor: '#2a2a35' },
            thead: { color: '#e8e8f0', borderBottomColor: '#2a2a35' },
            tbody: { tr: { borderBottomColor: '#2a2a35' } },
          },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 111, 255, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(124, 111, 255, 0.3)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
