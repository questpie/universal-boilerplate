import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'node:path'

type PrunePackageOpts = {
  packageName: string
  outDir: string
  includeDev: boolean
}

export async function prunePackage(opts: PrunePackageOpts) {
  const rootDir = process.cwd()
  const workspaces = await getWorkspaces(rootDir)

  if (!workspaces.has(opts.packageName)) {
    throw new Error(`Package "${opts.packageName}" not found in workspaces`)
  }

  const dependencyTree = await buildDependencyTree(opts.packageName, workspaces, opts.includeDev)

  const depsPaths = new Map<string, string>()

  for (const [pkgName, pkgPath] of workspaces.entries()) {
    if (dependencyTree.has(pkgName)) {
      depsPaths.set(pkgName, pkgPath)
    }
  }

  await copyProjectStructure(rootDir, opts.outDir, depsPaths)
}

async function getWorkspaces(rootDir: string): Promise<Map<string, string>> {
  const rootPackageJson = await fs.readJson(path.join(rootDir, 'package.json'))
  const workspacePatterns = rootPackageJson.workspaces || []

  const workspaces = new Map<string, string>()

  for (const pattern of workspacePatterns) {
    const packageJsons = glob.sync(path.join(rootDir, pattern, 'package.json'))
    for (const packageJsonPath of packageJsons) {
      const packageJson = await fs.readJson(packageJsonPath)
      workspaces.set(packageJson.name, path.dirname(packageJsonPath))
    }
  }

  return workspaces
}

async function buildDependencyTree(
  packageName: string,
  workspaces: Map<string, string>,
  includeDev: boolean
): Promise<Set<string>> {
  const dependencyTree = new Set<string>([packageName])
  const queue = [packageName]

  while (queue.length > 0) {
    const currentPackage = queue.shift()!
    const packageJsonPath = path.join(workspaces.get(currentPackage)!, 'package.json')
    const packageJson = await fs.readJson(packageJsonPath)

    const dependencies = {
      ...(packageJson.dependencies ?? {}),
      ...(includeDev ? packageJson.devDependencies ?? {} : {}),
    }

    for (const [dep, version] of Object.entries(dependencies)) {
      if (workspaces.has(dep) && version === 'workspace:*' && !dependencyTree.has(dep)) {
        dependencyTree.add(dep)
        queue.push(dep)
      }
    }
  }

  return dependencyTree
}

async function copyProjectStructure(
  rootDir: string,
  outDirectory: string,
  depsPaths: Map<string, string>
) {
  // Read root package.json to get workspace patterns
  const rootPackageJson = await fs.readJson(path.join(rootDir, 'package.json'))
  const workspacePatterns: string[] = rootPackageJson.workspaces || []
  const ignore = ['node_modules', '.git']

  // Resolve workspace patterns to actual directory names
  const workspaceDirs = new Set<string>()
  for (const pattern of workspacePatterns) {
    const matches = await glob(pattern, { cwd: rootDir })
    // biome-ignore lint/complexity/noForEach: <explanation>
    matches.forEach((match) => workspaceDirs.add(match.split('/')[0]))
  }

  // Copy root directory contents
  const rootContents = await fs.readdir(rootDir)
  for (const item of rootContents) {
    const srcPath = path.join(rootDir, item)
    const destPath = path.join(outDirectory, item)

    // Skip node_modules, .git, and workspace folders
    if (ignore.includes(item) || workspaceDirs.has(item)) continue

    // Copy the item
    await fs.copy(srcPath, destPath)
  }

  // Copy specific packages from depsPaths
  for (const [, pkgPath] of depsPaths) {
    const relativePackagePath = path.relative(rootDir, pkgPath)
    const destPath = path.join(outDirectory, relativePackagePath)
    await fs.copy(pkgPath, destPath)
  }
}
