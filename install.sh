#!/usr/bin/env zsh

cd "$(PWD)/install-dotfiles";
yarn;
cd -;
yarn;
"$(PWD)/install-dotfiles/bin/run";
