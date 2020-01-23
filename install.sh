#!/usr/bin/env zsh

# Install node
curl -Ls https://install-node.now.sh | sh;

# Install dependencies
npm install;

# Let's go
./bin/run;
