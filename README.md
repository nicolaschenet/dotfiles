# dotfiles

## Install

```bash
# Clone the dotfiles repo
git clone git@github.com:nicolaschenet/dotfiles.git

# Terminal (hyper)
mv ~/.hyper.js ~/.hyper.js.old
ln -s ~/.dotfiles/terminal/.hyper.js  ~/.hyper.js

# Terminal (zsh)
mv ~/.zshrc ~/.zshrc.old
ln -s ~/.dotfiles/zsh/.zshrc  ~/.zshrc

# Git
mv ~/.gitconfig ~/.gitconfig.old
ln -s ~/.dotfiles/zsh/.gitconfig  ~/.gitconfig

# Vscode
mv ~/Library/Application\ Support/Code/User/settings.json Library/Application\ Support/Code/User/settings.json.old
ln -s ~/.dotfiles/editor/vscode.config.json  ~/Library/Application\ Support/Code/User/settings.json


```
