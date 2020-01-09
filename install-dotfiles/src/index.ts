/* eslint-disable no-console */
import { Command } from '@oclif/command'
import inquirer from 'inquirer'
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

let userInfo: UserInfo = {}

const setUserInfo = (info: UserInfo) => {
  userInfo = {
    ...userInfo,
    ...info,
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
  title: 'Git',
  task: () => git(userInfo),
  skip: () => false,
}])

const runTasks = () => {
  console.log('\n✨  Setting up laptop, grab a coffee and enjoy :)')
  console.log('================================================\n')
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
    // Clear screen
    shell.exec('clear')
    // Ask for some user specific information
    console.log('🕵️  A few questions before we start:')
    console.log('===================================\n')
    inquirer
    .prompt([{
      type: 'input',
      name: 'gitUserName',
      message: 'What is your git user full name?',
      default: 'Nicolas Chenet',
    }, {
      type: 'input',
      name: 'gitUserEmail',
      message: 'What is your git user email address?',
      default: 'nicolas.chenet@datadoghq.com',
    }, {
      type: 'password',
      name: 'password',
      message: 'This setup needs to use `su`, password please?',
      validate: input => input.trim() === '' ? 'Password cannot be blank' : true,
    }])
    .then((info: UserInfo) => {
      // Store user info for further use
      setUserInfo(info)
      // Ask for sudo privileges upfront
      shell.exec(`echo ${info.password} | sudo -Sv`, { async: true, silent: true }, (code, stdout, stderr) => {
        if (stderr !== '') {
          return console.error('\n💥  Wrong password, aborting...')
        }
        // Run the tasks only if password is okay
        runTasks()
      })
    })
  }
}

export = InstallDotfiles
