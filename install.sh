#!/usr/bin/env zsh

# Install node
curl -Ls https://install-node.now.sh | sh;

# Install yarn
curl -o- -L https://yarnpkg.com/install.sh | sh;

# Install dependencies
yarn;

# Let's go
./bin/run;
