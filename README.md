# dotfiles

## Pre-requisites

 - Create a `.secrets` file in your HOME directory
 - Put in every secret tokens or any other personal variables you need to be exported

#### Example
```
GITLAB_TOKEN:xxxxxxxxxxx
```

#### Needed variables (my use case)
- GITLAB_TOKEN

## Install

```bash
# Clone the repo
git clone git@github.com:nicolaschenet/dotfiles.git ~/.dotfiles

# Setup laptop
cd ~/.dotfiles
./install.sh
```

Executables are available in `install-dotfiles/dist` if necessary.
