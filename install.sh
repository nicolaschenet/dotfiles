#!/usr/bin/env zsh

# Install node
sudo curl -Ls https://install-node.now.sh | sh;

# Revert `.config` owner to current user
sudo chown -R $(whoami) ~/.config

# Install dependencies
npm install;

# Let's go
./bin/run;
