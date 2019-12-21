.PHONEY: link unlink

all: backup link

backup:
	@echo "\nBacking up old configuration files...\n"
	-@mv -fv ~/.hyper.js ~/.hyper.js.old
	-@mv -fv ~/.zshrc ~/.zshrc.old
	-@mv -fv ~/.gitconfig ~/.gitconfig.old
	-@mv -fv ~/Library/Application\ Support/Code/User/settings.json ~/Library/Application\ Support/Code/User/settings.json.old

link:
	@echo "\nLinking dotfiles...\n"
	-@ln -sv "$(PWD)/terminal/.hyper.js"  ~/.hyper.js
	-@ln -sv "$(PWD)/zsh/.zshrc"  ~/.zshrc
	-@ln -sv "$(PWD)/git/.gitconfig"  ~/.gitconfig
	-@ln -sv "$(PWD)/editor/vscode.config.json"  ~/Library/Application\ Support/Code/User/settings.json

# Interactively delete symbolic links.
unlink:
	@echo "\nUnlinking dotfiles...\n"
	@rm -fv ~/.hyper.js
	@rm -fv ~/.zshrc
	@rm -fv ~/.gitconfig
	@rm -fv ~/Library/Application\ Support/Code/User/settings.json
	@echo "\nRestoring old configuration files...\n"
	-@mv -fv ~/.hyper.js.old ~/.hyper.js
	-@mv -fv ~/.zshrc.old ~/.zshrc
	-@mv -fv ~/.gitconfig.old ~/.gitconfig
	-@mv -fv ~/Library/Application\ Support/Code/User/settings.json.old ~/Library/Application\ Support/Code/User/settings.json
