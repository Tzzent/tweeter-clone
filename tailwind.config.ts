import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logo-small': "url('/images/tweeter-small.svg')",
        'logo': "url('/images/tweeter.svg')",
      }
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    }
  }
}
export default config
