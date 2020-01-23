#!/usr/bin/env zsh

sudo -v

# Keep-alive: update existing sudo time stamp if set, otherwise do nothing.
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

# Install node
sudo curl -Ls https://install-node.now.sh | sh;

# Revert `.config` owner to current user
sudo chown -R $(whoami) ~/.config

# Install dependencies
npm install;

# Let's go
./bin/run;
