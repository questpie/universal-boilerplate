/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@gluestack-ui/nativewind-utils',
    'nativewind',
    'react-native-css-interop',
    'react-native-web',
    '@react-native/assets',
    'expo-asset',
    'expo-modules-core',
    'react-native-svg',
    'react-native',
  ],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
    }

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]

    return config
  },
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    forceSwcTransforms: true,
  },
}

export default nextConfig
