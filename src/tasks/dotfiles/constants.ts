import { DOTFILES_PATH } from '../../constants'

interface DotfilesMap {
    [key: string]: string;
}

export const DOTFILES: DotfilesMap = {
  [`${DOTFILES_PATH}/editor/vscode.config.json`]: 'Library/Application Support/Code/User/settings.json',
  [`${DOTFILES_PATH}/git/.gitconfig`]: '.gitconfig',
  [`${DOTFILES_PATH}/terminal/.hyper.js`]: '.hyper.js',
  [`${DOTFILES_PATH}/zsh/.zshrc`]: '.zshrc',
  [`${DOTFILES_PATH}/zsh/.p10k.zsh`]: '.p10k.zsh',
}
