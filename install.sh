#!/usr/bin/env zsh

# Install node
sudo curl -Ls https://install-node.now.sh | sh;

# Install yarn
sudo curl -o- -L https://yarnpkg.com/install.sh | sh;

# Make sure yarn executable is available
[ -f ~/.bashrc ] && source ~/.bashrc
[ -f ~/.zshrc ] && source ~/.zshrc

# Install dependencies
yarn;

# Let's go
./bin/run;
