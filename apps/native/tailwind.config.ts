import type { Config } from 'tailwindcss'
import tailwindConfig from '../../packages/ui/tailwind.config'

export default {
  ...tailwindConfig,
  content: [
    ...tailwindConfig.content,
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/app/src/**/*.{js,jsx,ts,tsx}',
  ],
} satisfies Config
