.PHONEY: install link unlink

all: install backup link

install: install-homebrew install-hyper install-zsh install-git install-vscode

install-homebrew:
	@echo "\nInstalling Homebrew..."
	-@curl -fsSL raw.githubusercontent.com/Homebrew/install/master/install | ruby
	@echo "\nUpdating Homebrew"
	-@brew update
install-hyper:
	@echo "\nInstalling Hyper..."
	-@brew cask install hyper
install-zsh:
	@echo "\nInstalling Oh my zsh..."
	-@curl -fsSL raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh
install-git:
	@echo "\nInstalling git..."
	-@brew install git
install-vscode:
	@echo "\nInstalling vscode..."
	-@brew cask install visual-studio-code
	-@code --install-extension alefragnani.project-manager
	-@code --install-extension arcticicestudio.nord-visual-studio-code
	-@code --install-extension atomiks.moonlight
	-@code --install-extension be5invis.vscode-custom-css
	-@code --install-extension bierner.github-markdown-preview
	-@code --install-extension bierner.markdown-checkbox
	-@code --install-extension bierner.markdown-emoji
	-@code --install-extension bierner.markdown-preview-github-styles
	-@code --install-extension bierner.markdown-yaml-preamble
	-@code --install-extension christian-kohler.path-intellisense
	-@code --install-extension dbaeumer.vscode-eslint
	-@code --install-extension Equinusocio.vsc-material-theme
	-@code --install-extension marcosfede.awesome-material-theme
	-@code --install-extension mgmcdermott.vscode-language-babel
	-@code --install-extension mikestead.dotenv
	-@code --install-extension NuclleaR.vscode-extension-auto-import
	-@code --install-extension phgn.vscode-starlark
	-@code --install-extension PKief.material-icon-theme
	-@code --install-extension RobbOwen.synthwave-vscode
	-@code --install-extension samverschueren.final-newline
	-@code --install-extension shd101wyy.markdown-preview-enhanced
	-@code --install-extension tristanremy.mirage
	-@code --install-extension waderyan.gitblame
	-@code --install-extension yummygum.city-lights-theme
	-@code --install-extension Zignd.html-css-class-completion

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
