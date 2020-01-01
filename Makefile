-include make/brew.formulae
-include make/brew.casks
-include make/yarn.packages.global
-include make/vscode.extensions

.PHONY: $(BREW_FORMULAE) $(BREW_CASKS) $(YARN_GLOBAL_PACKAGES) $(VSCODE_EXTENSIONS)

all: install backup link setup-macos after-install

install: install-homebrew \
		 install-brew-apps \
		 install-zsh install-zsh-syntax-highlighting install-p10k \
		 install-vscode-extensions install-yarn-global-packages \
		 install-command-line-tools \
		 install-fonts

install-homebrew:
	@echo "\nInstalling Homebrew..."
	-@curl -fsSL raw.githubusercontent.com/Homebrew/install/master/install | ruby
	@echo "\nUpdating Homebrew"
	-@brew update

install-brew-apps: install-brew-formulae install-brew-casks

install-brew-formulae: $(BREW_FORMULAE)
install-brew-casks: $(BREW_CASKS)

$(BREW_FORMULAE):
	@echo "\nInstalling $@..."
	-@brew install $@

$(BREW_CASKS):
	@echo "\nInstalling $@..."
	-@brew cask install $@

install-zsh:
	@echo "\nInstalling Oh my zsh..."
	-@curl -fsSL raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh

install-zsh-syntax-highlighting:
	@echo "\nInstalling Oh my zsh plugins..."
	-@git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

install-p10k:
	@echo "\nInstalling powerlevel10k..."
	-@git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/.oh-my-zsh/custom/themes/powerlevel10k
	-@cp -v "$(PWD)/zsh/.p10k.zsh" ~/.p10k.zsh

install-vscode-extensions: $(VSCODE_EXTENSIONS)

 $(VSCODE_EXTENSIONS):
	-@code --install-extension $@

install-yarn-global-packages: $(YARN_GLOBAL_PACKAGES)

$(YARN_GLOBAL_PACKAGES):
	@echo "\nInstalling Yarn global package $@..."
	-@yarn global add $@

install-command-line-tools:
	@echo "\nInstalling Command line tools..."
	-@xcode-select --install

install-fonts:
	@echo "\nInstalling fonts..."
	-@cp -av "$(PWD)/fonts/." ~/Library/Fonts

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

setup-macos:
	@echo "\nSetting up MacOS...\n"
	-@source "$(PWD)/macos/setup.sh"
	@echo "MacOS ready. Note that some of the changes require a logout/restart to take effect."

after-install:
	@echo "\n\n🎉 🎉 🎉  You're all good! 🎉 🎉 🎉\n"
