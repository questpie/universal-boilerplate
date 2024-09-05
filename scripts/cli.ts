import { boolean, command, positional, run, string } from '@drizzle-team/brocli'
import { createPackage } from '@questpie/script/commands/create-package'
import { prunePackage } from '@questpie/script/commands/prune'

const createPackageCommand = command({
  name: 'create:package',
  desc: 'Create a new package',
  options: {
    name: positional().desc('The name of the package to create').required(),
  },
  handler: async (opts) => {
    return await createPackage({
      name: opts.name,
      type: 'package',
    })
  },
})

const pruneCommand = command({
  name: 'prune',
  desc: 'Prunes this monorepo to contain only dependencies of given package',

  options: {
    name: positional('name').desc('The name of the package').required(),
    out: string('out').alias('o').desc('The out directory').default('out'),
    dev: boolean('dev')
      .alias('d')
      .desc('Include dev dependencies in dependency tree')
      .default(true),
  },
  handler: async (opts) => {
    return await prunePackage({
      packageName: opts.name,
      outDir: opts.out,
      includeDev: opts.dev,
    })
  },
})

run([createPackageCommand, pruneCommand]) // parse shell arguments and run command
