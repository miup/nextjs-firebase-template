import { execSync } from 'child_process'

export const print = (message: string): void => {
  // eslint-disable-next-line no-console
  console.log(`⚙️  ${message}`)
}

export const executeCommand = (command: string, dryrun: boolean): void => {
  if (!dryrun) {
    execSync(command, { maxBuffer: 1024 * 1024, stdio: 'inherit' })
  } else {
    print(`🛠  Run: ${command}`)
  }
}

export const execute = <T>(
  label: string,
  command: () => T,
  dryrun: boolean
): T | undefined => {
  if (!dryrun) {
    return command()
  } else {
    print(`🛠  Run: ${label}`)
    return undefined
  }
}

export const executeAsync = async <T>(
  label: string,
  command: () => Promise<T>,
  dryrun: boolean
): Promise<T | undefined> => {
  if (!dryrun) {
    return command()
  } else {
    print(`🛠  Run: ${label}`)
    return undefined
  }
}

export const joinArguments = (args: (string | undefined)[]): string => {
  return args.filter((arg) => arg).join(' ')
}
