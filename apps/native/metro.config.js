// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config')
const path = require('node:path')
const { withNativeWind } = require('nativewind/metro')

const projectRoot = __dirname
const workspaceRoot = path.resolve(__dirname, '../..')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot)

// // Add import aliases
// config.resolver.alias = {
//   '@questpie/ui': path.resolve(workspaceRoot, 'packages/ui/src'),
// }

// Add the additional `cjs` extension to the resolver
config.resolver.sourceExts.push('cjs')
config.resolver.sourceExts.push('mjs')

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]
// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = false

config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
}
config.transformer.minifierPath = require.resolve('metro-minify-terser')

module.exports = withNativeWind(config, { input: '../../packages/ui/src/globals.css' })
