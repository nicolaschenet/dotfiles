/* eslint-disable no-console */
import { Command } from '@oclif/command'

import Listr from 'listr'

import chalk from 'chalk'
import inquirer from 'inquirer'
import shell from 'shelljs'

import { installHomebrew, installBrewFormulae, installBrewCasks } from './tasks/homebrew'
import {
  installOhMyZsh,
  installZshPlugins,
  initRbenv,
  installLatestRuby,
  setRubyVersion,
  uninstallOhMyZsh,
} from './tasks/zsh'
import { installVsCodeExtensions } from './tasks/vscode'
import { installYarnPackages } from './tasks/yarn'
import {
  installCliTools,
  installFonts,
  installWallpaper,
  setupMacOS,
} from './tasks/system'
import { backupOldDotfiles, installDotFiles, prepareDotFilesDirs } from './tasks/dotfiles'
import { git } from './tasks/git'

import { UserInfo } from './types'

const { error, log } = console

let userInfo: UserInfo = {}

const setUserInfo = (info: UserInfo) => {
  userInfo = {
    ...userInfo,
    ...info,
  }
}

const handleSkipFor = (choice: string) => userInfo.installChoice && !userInfo.installChoice.includes(choice)
const shouldAskPassword = (fullInstall?: boolean, installChoice?: string[]) => fullInstall || installChoice?.includes('macos')
const shouldAskGitInfo = (fullInstall?: boolean, installChoice?: string[]) => fullInstall || installChoice?.includes('git')

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

const zsh = () =>
  new Listr(
    [
      {
        title: 'Init rbenv',
        task: initRbenv,
        skip: () => false,
      },
      {
        title: 'Install latest ruby version',
        task: installLatestRuby,
        skip: () => false,
      },
      {
        title: 'Setting ruby version to latest',
        task: setRubyVersion,
        skip: () => false,
      },
      {
        title: 'Uninstall Oh My Zsh',
        task: uninstallOhMyZsh,
        skip: () => false,
      },
      {
        title: 'Install Oh My Zsh',
        task: installOhMyZsh,
        skip: () => false,
      },
      {
        title: 'Install plugins',
        task: installZshPlugins,
        skip: () => false,
      },
    ]
  )

const system = () => new Listr([{
  title: 'Install command line tools',
  task: installCliTools,
  skip: () => handleSkipFor('cli'),
}, {
  title: 'Install custom fonts',
  task: installFonts,
  skip: () => handleSkipFor('fonts'),
}, {
  title: 'Install wallpaper',
  task: installWallpaper,
  skip: () => handleSkipFor('wallpaper'),
}, {
  title: 'Setup MacOS',
  task: setupMacOS,
  skip: () => handleSkipFor('macos'),
}])

const dotfiles = () =>
  new Listr(
    [
      {
        title: 'Backup old dotfiles',
        task: backupOldDotfiles,
        skip: () => false,
      },
      {
        title: 'Prepare dotfiles directories',
        task: prepareDotFilesDirs,
        skip: () => false,
      },
      {
        title: 'Install new dotfiles',
        task: installDotFiles,
        skip: () => false,
      },
    ]
  )

const tasks = new Listr(
  [
    {
      title: 'System',
      task: system,
      skip: () => false,
    },
    {
      title: 'Homebrew',
      task: homebrew,
      skip: () => handleSkipFor('homebrew'),
    },
    {
      title: 'Zsh',
      task: zsh,
      skip: () => handleSkipFor('zsh'),
    },
    {
      title: 'Install Visual Studio Code extensions',
      task: installVsCodeExtensions,
      skip: () => handleSkipFor('vscode'),
    },
    {
      title: 'Install Yarn global packages',
      task: installYarnPackages,
      skip: () => handleSkipFor('yarn'),
    },
    {
      title: 'Dotfiles',
      task: dotfiles,
      skip: () => handleSkipFor('dotfiles'),
    },
    {
      title: 'Git',
      task: () => git(userInfo),
      skip: () => handleSkipFor('git'),
    },
  ]
)

const runTasks = () => {
  log(chalk.bold.blueBright('\n💻  Setting up laptop, grab a coffee and enjoy :)'))
  log('================================================')
  log(chalk.dim('A few system pop-ups could appear... Just say yes!\n\n'))
  tasks
  .run()
  .then(() => {
    log(chalk.bold("\n\n🎉  You're all good!"))
    log(chalk.dim('\nNote that some of the changes require a logout/restart to take effect.\n'))
  })
  .catch(error => {
    error(error)
  })
}

class InstallDotfiles extends Command {
  async run() {
    // Clear screen
    shell.exec('clear')
    // Ask for some user specific information
    log('🕵️  A few questions before we start:')
    log('===================================\n')
    inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'fullInstall',
        message: 'Install everything?',
      },
      {
        type: 'checkbox',
        name: 'installChoice',
        message: 'What do you want to install?',
        when: ({ fullInstall }) => !fullInstall,
        choices: [{
          name: 'Homebrew stuff',
          value: 'homebrew',
          checked: true,
        },
        {
          name: 'Zsh stuff',
          value: 'zsh',
          checked: true,
        },
        {
          name: 'Visual Studio Code extensions',
          value: 'vscode',
          checked: true,
        },
        {
          name: 'Yarn global packages',
          value: 'yarn',
          checked: true,
        },
        {
          name: 'Tweak the system (MacOS)',
          value: 'macos',
          checked: true,
        },
        {
          name: 'Command line tools',
          value: 'cli',
          checked: true,
        },
        {
          name: 'Custom fonts',
          value: 'fonts',
          checked: true,
        },
        {
          name: 'Custom wallpaper',
          value: 'wallpaper',
          checked: true,
        },
        {
          name: 'Custom dotfiles',
          value: 'dotfiles',
          checked: true,
        },
        {
          name: 'Git settings',
          value: 'git',
          checked: true,
        }],
      },
      {
        type: 'input',
        name: 'gitUserName',
        message: 'What is your git user full name?',
        default: 'Nicolas Chenet',
        when: ({ fullInstall, installChoice }) => shouldAskGitInfo(fullInstall, installChoice),
      },
      {
        type: 'input',
        name: 'gitUserEmail',
        message: 'What is your git user email address?',
        default: 'nicolas.chenet@datadoghq.com',
        when: ({ fullInstall, installChoice }) => shouldAskGitInfo(fullInstall, installChoice),
      },
      {
        type: 'password',
        name: 'password',
        message: 'To tweak the system, we need to use `su`, password please?',
        validate: input => input.trim() === '' ? 'Password cannot be blank' : true,
        when: ({ fullInstall, installChoice }) => shouldAskPassword(fullInstall, installChoice),
      },
    ])
    .then((info: UserInfo) => {
      // Store user info for further use
      setUserInfo(info)

      if (!shouldAskPassword(info.fullInstall, info.installChoice)) {
        return runTasks()
      }

      // Ask for sudo privileges upfront
      shell.exec(`echo ${info.password} | sudo -Sv`, { async: true, silent: true }, (code, stdout, stderr) => {
        if (stderr !== '' && stderr.includes('incorrect')) {
          return error(chalk.bold.redBright('\n💥  Wrong password, aborting...'))
        }
        // Run the tasks only if password is okay
        runTasks()
      })
    })
  }
}

export = InstallDotfiles
