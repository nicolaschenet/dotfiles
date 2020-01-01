import Listr from 'listr'
import path from 'path'
import shell from 'shelljs'

import {HOME} from '../../constants'
import {execCommand} from '../../utils'

export const installCliTools = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => new Promise(resolve => {
  const stderr = shell.exec('xcode-select --install', {silent: true}).stderr
  if (stderr.indexOf('already installed') !== -1) {
    task.skip('Command line tools are already installed, use "Software Update" to install updates')
  }
  resolve()
})

export const installFonts = () => shell.cp('-R', 'fonts/*', `${HOME}/Library/Fonts`)

export const setupMacOS = () => execCommand(`${path.resolve('macos/setup.sh')}`)
