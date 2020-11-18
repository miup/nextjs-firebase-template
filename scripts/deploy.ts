/* eslint-disable no-console */
import { executeCommand, joinArguments, print } from './helper'

interface Config {
  key: ConfigKey
  value: string
}
enum ConfigKey {}

const config: Config[] = []

const main = () => {
  if (process.argv.includes('--help')) {
    console.log('Usage: yarn deploy [options...]')
    return 0
  }

  let token: string | undefined
  if (process.argv.indexOf('--token') > 0) {
    token = `--token ${process.argv[process.argv.indexOf('--token') + 1]}`
  }

  let only: string | undefined
  if (process.argv.indexOf('--only') > 0) {
    only = `--only ${process.argv[process.argv.indexOf('--only') + 1]}`
  }

  const skipConfig = process.argv.includes('--skip-config')
  const force = process.argv.includes('--force')
  const dryrun = process.argv.includes('--dry-run')

  print('Start deploying features to Firebase')
  dryrun && print('Enabled Dry run mode.')

  print('Build')
  executeCommand(`yarn --silent build`, dryrun)

  if (!skipConfig) {
    print('Set firebase config values')
    config.forEach((config) => {
      executeCommand(
        `firebase functions:config:set ${config.key}=${
          config.value
        } ${joinArguments([token])}`,
        dryrun
      )
    })
  }

  print(`Deploy features. ${only || ''} force: ${force}`)
  executeCommand(
    `yarn --silent firebase deploy ${joinArguments([
      only,
      force ? '--force' : '',
      token,
    ])}`,
    dryrun
  )

  console.log('All done 🎉')
  return 0
}

process.exit(main())
