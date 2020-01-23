#!/usr/bin/env zsh

# Install node
curl -Ls https://install-node.now.sh | sh;

# Install dependencies
npm install;

echo $(whoami);

# Revert `.config` owner to current user
chown -R $(whoami) ~/.config

# Let's go
./bin/run;
