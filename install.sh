#!/usr/bin/env zsh

cd "$(PWD)/install-dotfiles";
yarn;
cd -;
"$(PWD)/install-dotfiles/bin/run";
