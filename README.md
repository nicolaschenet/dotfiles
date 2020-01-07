# dotfiles

## Pre-requisites

 - Create a `.secrets` file on the root of your user
 - Put in every secret tokens or any other personal variable your need to be exported

#### Example
```
GITLAB_TOKEN:xxxxxxxxxxx
```

#### Needed secrets for everything to be okay
- GITLAB_TOKEN

## Install

```bash
# Clone the dotfiles repo
git clone git@github.com:nicolaschenet/dotfiles.git ~/.dotfiles

# Setup laptop
cd ~/.dotfiles
./install.sh
```

Executables are available in `install-dotfiles/dist` if necessary.
