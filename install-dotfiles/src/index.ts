/* eslint-disable no-console */
import { Command } from '@oclif/command'

const { Form } = require('enquirer')

import shell from 'shelljs'
import Listr from 'listr'

import { installHomebrew, installBrewFormulae, installBrewCasks } from './tasks/homebrew'
import { installOhMyZsh, installZshPlugins } from './tasks/zsh'
import { installVsCodeExtensions } from './tasks/vscode'
import { installYarnPackages } from './tasks/yarn'
import { installCliTools, installFonts, setupMacOS } from './tasks/system'
import { backupOldDotfiles, installDotFiles } from './tasks/dotfiles'
import { git } from './tasks/git'

import { UserInfo } from './types'

let userInfos: UserInfo = {}

const setUserInfos = (infos: UserInfo) => {
  userInfos = {
    ...userInfos,
    ...infos,
  }
}

const homebrew = () => new Listr([{
  title: 'Install Homebrew',
  task: installHomebrew,
  skip: () => false,
}, {
  title: 'Install formulae',
  task: installBrewFormulae,
  skip: () => false,
}, {
  title: 'Install casks',
  task: installBrewCasks,
  skip: () => false,
}])

const zsh = () => new Listr([{
  title: 'Install Oh My Zsh',
  task: installOhMyZsh,
  skip: () => false,
}, {
  title: 'Install plugins',
  task: installZshPlugins,
  skip: () => false,
}])

const system = () => new Listr([{
  title: 'Install command line tools',
  task: installCliTools,
  skip: () => false,
}, {
  title: 'Install custom fonts',
  task: installFonts,
  skip: () => false,
}, {
  title: 'Setup MacOS',
  task: setupMacOS,
  skip: () => false,
}])

const dotfiles = () => new Listr([{
  title: 'Backup old dotfiles',
  task: backupOldDotfiles,
  skip: () => false,
}, {
  title: 'Install new dotfiles',
  task: installDotFiles,
  skip: () => false,
}])

const tasks = new Listr([{
  title: 'Homebrew',
  task: homebrew,
  skip: () => false,
}, {
  title: 'Zsh',
  task: zsh,
  skip: () => false,
}, {
  title: 'Install Visual Studio Code extensions',
  task: installVsCodeExtensions,
  skip: () => false,
}, {
  title: 'Install Yarn global packages',
  task: installYarnPackages,
  skip: () => false,
}, {
  title: 'System',
  task: system,
  skip: () => false,
}, {
  title: 'Dotfiles',
  task: dotfiles,
  skip: () => false,
}, {
  title: 'Git setup',
  task: () => git(userInfos),
  skip: () => false,
}])

const runTasks = () => {
  console.log('\n✨ Setting up laptop, grab a coffee and enjoy :)')
  console.log('===============================================\n')
  tasks
  .run()
  .then(() => {
    console.log("\n🎉  You're all good!")
    console.log('\nℹ️  Note that some of the changes require a logout/restart to take effect.')
  })
  .catch(error => {
    console.error(error)
  })
}

class InstallDotfiles extends Command {
  async run() {
    // Ask for sudo privileges upfront
    shell.exec('sudo -v')
    // Clear screen
    shell.exec('clear')
    // Ask for some user specific information
    const prompt = new Form({
      name: 'user',
      message: '🕵️  Before we continue, please tell me more about you 🕵️',
      choices: [
        { name: 'firstname', message: 'First name', initial: 'Nicolas' },
        { name: 'lastname', message: 'Last name', initial: 'Chenet' },
        { name: 'email', message: 'Git user email', initial: 'nicolas.chenet@datadoghq.com' },
      ],
    })
    prompt.run()
    .then((info: UserInfo) => {
      // Store user info for further use
      setUserInfos(info)
      // Run the tasks
      runTasks()
    })
    .catch(console.error)
  }
}

export = InstallDotfiles
