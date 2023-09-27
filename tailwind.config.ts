import type { Config } from 'tailwindcss'

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
    }
  }
}
export default config
