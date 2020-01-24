import Listr from 'listr'
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

const VerboseRenderer = require('listr-verbose-renderer')

import { DOTFILES } from './constants'
import { HOME } from '../../constants'
import { execCommand } from '../../utils'

export const backupOldDotfiles = () => new Listr(Object.values(DOTFILES).map(file => ({
  title: file,
  task: () => {
    try {
      return fs.renameSync(
        `${HOME}/${file}`,
        `${HOME}/${file}.old`
      )
    } catch (error) {
      // Avoid trash error message
    }
  },
})), { renderer: VerboseRenderer })

export const prepareDotFilesDirs = () =>
  shell.mkdir('-p', `${HOME}/Library/Application Support/Code/User`)

export const installDotFiles = () => new Listr(Object.keys(DOTFILES).map(source => ({
  title: source,
  task: () => shell.ln('-sf', path.resolve(source), path.resolve(HOME, DOTFILES[source])),
})), { renderer: VerboseRenderer })
