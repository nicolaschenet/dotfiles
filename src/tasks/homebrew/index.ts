import Listr from 'listr'

import { execCommand } from '../../utils'
import { BREW_FORMULAE, BREW_CASKS } from './constants'

export const installHomebrew = () =>
  execCommand('curl -fsSL raw.githubusercontent.com/Homebrew/install/master/install | ruby')

export const installBrewFormulae = () => new Listr(BREW_FORMULAE.map(formula => ({
  title: formula,
  task: () => execCommand(`brew install ${formula}`),
})))

export const installBrewCasks = () => new Listr(BREW_CASKS.map(cask => ({
  title: cask,
  task: () => execCommand(`brew cask install ${cask}`),
})))
