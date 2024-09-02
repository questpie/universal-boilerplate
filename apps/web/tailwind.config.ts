import type { Config } from 'tailwindcss'
import tailwindConfig from '../../packages/ui/tailwind.config'

export default {
  ...tailwindConfig,
  content: ['./src/**/*.{html,js,jsx,ts,tsx,mdx}'],
  presets: [require('nativewind/preset')],
  important: 'html',
} satisfies Config
