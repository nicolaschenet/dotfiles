interface DotfilesMap {
    [key: string]: string;
}

export const DOTFILES: DotfilesMap = {
  'terminal/.hyper.js': '.hyper.js',
  'zsh/.zshrc': '.zshrc',
  'git/.gitconfig': '.gitconfig',
  'zsh/.p10k.zsh': '.p10k.zsh',
  'editor/vscode.config.json': 'Library/Application Support/Code/User/settings.json',
}
