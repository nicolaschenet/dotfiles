/* eslint-disable no-async-promise-executor */
/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable no-console */

import {Command} from '@oclif/command'
import fs from 'fs'
import path from 'path'
import os from 'os'
import {ncp} from 'ncp'
import shell from 'shelljs'

import execa from 'execa'
import Listr from 'listr'

const HOME = os.homedir()

const BREW_FORMULAE = ['git', 'gmp', 'htop', 'node', 'yarn']
const BREW_CASKS = [
  '1clipboard',
  '1password',
  'docker',
  'github',
  'google-chrome',
  'hyper',
  'slack',
  'skype',
  'spotify',
  'visual-studio-code',
  'whatsapp',
  'zoom',
]

const VSCODE_EXTENSIONS = [
  'alefragnani.project-manager',
  'arcticicestudio.nord-visual-studio-code',
  'atomiks.moonlight',
  'be5invis.vscode-custom-css',
  'bierner.github-markdown-preview',
  'christian-kohler.path-intellisense',
  'dbaeumer.vscode-eslint',
  'Equinusocio.vsc-material-theme',
  'marcosfede.awesome-material-theme',
  'mgmcdermott.vscode-language-babel',
  'mikestead.dotenv',
  'NuclleaR.vscode-extension-auto-import',
  'phgn.vscode-starlark',
  'PKief.material-icon-theme',
  'RobbOwen.synthwave-vscode',
  'samverschueren.final-newline',
  'shd101wyy.markdown-preview-enhanced',
  'tristanremy.mirage',
  'waderyan.gitblame',
  'yummygum.city-lights-theme',
  'Zignd.html-css-class-completion',
]

const YARN_PACKAGES = ['gitmoji-cli', 'typescript']

interface DotfilesMap {
  [key: string]: string;
}

const DOTFILES: DotfilesMap = {
  'terminal/.hyper.js': '.hyper.js',
  'zsh/.zshrc': '.zshrc',
  'git/.gitconfig': '.gitconfig',
  'zsh/.p10k.zsh': '.p10k.zsh',
  'editor/vscode.config.json': 'Library/Application Support/Code/User/settings.json',
}

const execCommand = (cmd: string) => new Promise(resolve => {
  shell.exec(cmd, {
    silent: true,
    async: true,
    shell: '/bin/zsh',
  }, () => resolve())
})

const installHomebrew = async () => {
  const {stdout} = await execa.command('curl -fsSL raw.githubusercontent.com/Homebrew/install/master/install')
  fs.writeFileSync('/tmp/install-homebrew.rb', stdout)
  return execa('ruby', ['/tmp/install-homebrew.rb'])
}

const installBrewFormulae = () => new Listr(BREW_FORMULAE.map(formula => ({
  title: formula,
  task: () => execCommand(`brew install ${formula}`),
})))

const installBrewCasks = () => new Listr(BREW_CASKS.map(cask => ({
  title: cask,
  task: () => execCommand(`brew cask install ${cask}`),
})))

const installYarnPackages = () => new Listr(YARN_PACKAGES.map(packageName => ({
  title: packageName,
  task: () => execCommand(`yarn global add ${packageName}`),
})))

const installOhMyZsh = async (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => {
  const {stdout} = await execa.command('curl -fsSL raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh')
  fs.writeFileSync('/tmp/install-ohmyzsh.sh', stdout)
  return execa('sh', ['/tmp/install-ohmyzsh.sh']).catch((error: any) => {
    if (error.stdout.indexOf('installed') !== -1) {
      task.skip('You already have Oh My Zsh installed.')
    }
  })
}

const installZshSyntaxHighlighting = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => execa(
  'git',
  [
    'clone',
    'https://github.com/zsh-users/zsh-syntax-highlighting.git',
    `${HOME}/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting`,
  ]
).catch(error => {
  if (error.stderr.indexOf('already exists') !== -1) {
    task.skip('Plugin already installed')
  }
})

const installP10K = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) =>
  execa(
    'git',
    [
      'clone',
      '--depth=1',
      'https://github.com/romkatv/powerlevel10k.git',
      `${HOME}/.oh-my-zsh/custom/themes/powerlevel10k`,
    ]
  ).catch(error => {
    if (error.stderr.indexOf('already exists') !== -1) {
      task.skip('Plugin already installed')
    }
  })

const installZshPlugins = () => new Listr([{
  title: 'zsh-syntax-highlighting',
  task: installZshSyntaxHighlighting,
}, {
  title: 'power-level-10k ',
  task: installP10K
  ,
}])

const installVsCodeExtensions = () => new Listr(VSCODE_EXTENSIONS.map(extension => ({
  title: extension,
  task: () => execa('code', ['--install', '-extension', extension]),
})))

const installCliTools = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => execa('xcode-select', ['--install']).catch(error => {
  if (error.stderr.indexOf('already installed') !== -1) {
    task.skip('Command line tools are already installed, use "Software Update" to install updates')
  }
})

const installFonts = () => new Promise((resolve, reject) =>
  ncp(
    path.resolve('fonts'),
    path.resolve(`${HOME}/Library/Fonts`),
    (error: any) => error ? reject(error) : resolve()
  )
)

const backupOldDotfiles = () => new Listr(Object.values(DOTFILES).map(file => ({
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
})))

const installDotFiles = () => new Listr(Object.keys(DOTFILES).map(source => ({
  title: source,
  task: () => execa('ln', ['-sv', path.resolve(source), path.resolve(HOME, DOTFILES[source])]),
})))

const setupMacOS = () => new Promise(resolve => {
  shell.exec(`${path.resolve('macos/setup.sh')}`, {
    silent: true,
    async: true,
    shell: '/bin/zsh',
  }, () => resolve())
})

const tasks = new Listr([{
  title: 'Install Homebrew',
  task: installHomebrew,
}, {
  title: 'Install brew formulae',
  task: installBrewFormulae,
}, {
  title: 'Install brew casks',
  task: installBrewCasks,
}, {
  title: 'Install Oh My ZSH',
  task: installOhMyZsh,
}, {
  title: 'Install zsh plugins',
  task: installZshPlugins,
}, {
  title: 'Visual Studio Code extensions',
  task: installVsCodeExtensions,
}, {
  title: 'Install global Yarn packages',
  task: installYarnPackages,
}, {
  title: 'Install command line tools',
  task: installCliTools,
}, {
  title: 'Install fonts',
  task: installFonts,
}, {
  title: 'Backup old dotfiles',
  task: backupOldDotfiles,
}, {
  title: 'Installing dotfiles',
  task: installDotFiles,
}, {
  title: 'Setup MacOS',
  task: setupMacOS,
}])

class InstallDotfiles extends Command {
  async run() {
    shell.exec('clear')
    // Ask for sudo priviledges upfront
    shell.exec('sudo -v')
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
}

export = InstallDotfiles
