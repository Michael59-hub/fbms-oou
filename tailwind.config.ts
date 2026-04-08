import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    // Next.js Frontend
    './src/app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}',
    // Payload Admin & Custom Components
    './src/app/(payload)/**/*.{js,ts,jsx,tsx}',
    // Your CMS Collections & Global configs
    './src/collections/**/*.ts',
    './src/globals/**/*.ts',
    // UI components (if you add a components folder later)
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Example: OOU Colors or Medical-themed palette
        medical: {
          blue: '#1e40af',
          green: '#10b981',
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}

export default config