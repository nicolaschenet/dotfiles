import Listr from 'listr'
import shell from 'shelljs'

import { HOME } from '../../constants'
import { execCommand } from '../../utils'

export const installZshSyntaxHighlighting = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => new Promise(resolve => {
  const stderr = shell.exec(`git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${HOME}/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting`, { silent: true }).stderr
  if (stderr.indexOf('exists') !== -1) {
    task.skip('Plugin already installed.')
  }
  resolve()
})

export const installP10K = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => new Promise(resolve => {
  const stderr = shell.exec(`git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${HOME}/.oh-my-zsh/custom/themes/powerlevel10k`, { silent: true }).stderr
  if (stderr.indexOf('exists') !== -1) {
    task.skip('Plugin already installed.')
  }
  resolve()
})

export const installOhMyZsh = (_ctx: Listr.ListrContext, task: Listr.ListrTaskWrapper<Listr.ListrContext>) => new Promise(resolve => {
  const stdout = shell.exec('curl -fsSL raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh', { silent: true }).stdout
  if (stdout.indexOf('installed') !== -1) {
    task.skip('You already have Oh My Zsh installed.')
  }
  resolve()
})

export const initRbenv = () => execCommand('rbenv init')
export const installLatestRuby = () => execCommand('rbenv install -s $(rbenv install -l | grep -v - | tail -1)')
export const setRubyVersion = () => execCommand('rbenv global $(rbenv install -l | grep -v - | tail -1)')

export const installZshPlugins = () => new Listr([{
  title: 'zsh-syntax-highlighting',
  task: installZshSyntaxHighlighting,
}, {
  title: 'power-level-10k ',
  task: installP10K,
}])
