module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            '@questpie/ui': '../../packages/ui/src',
            '@questpie/app': '../../packages/app/src',
            '@questpie/shared': '../../packages/shared/src',
          },
          extensions: ['.js', '.ts', '.tsx', '.ios.ts', '.android.ts'],
        },
      ],
    ],
  }
}
