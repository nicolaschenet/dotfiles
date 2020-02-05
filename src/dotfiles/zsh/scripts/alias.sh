unalias gc
unalias gap

alias zconf="code ~/.zshrc"
alias reload="source ~/.zshrc"

alias tuning="code ~/.dotfiles/src/dotfiles"

alias bs="branches-status"

alias gap="git add -p"
alias gco="git co"
alias gbr="git br"
alias glog="git lg"
alias gb="gco -b"
alias gc="gitmoji -c"
alias gci="git ci"
alias gs="git status"
alias gss="git status --short"
alias gpu="[[ -z $(git config "branch.$(git symbolic-ref --short HEAD).merge") ]] && git push -u origin $(git symbolic-ref --short HEAD) || git push"
alias atp="git fetch -atp && git status"
alias grc="git rebase --continue"
alias gra="git rebase --abort"
alias catchup="atp && git rebase origin/prod"
alias branch-create="git branch-create"
alias branch-delete="git branch-delete"
alias branch-delete-remote="git branch-delete-remote"
alias bc="git branch-create"
alias bd="git branch-delete"
alias bdr="git branch-delete-remote"
alias gcr="git commit-review"

alias hotkit="yarn && yarn hotdog --env.entries=styleguide"
alias hotspa="yarn && yarn hotdog --env.entries=spa"
alias hotdog="yarn && yarn hotdog --env.entries=watchdog"
alias hotk9="yarn && yarn hotdog --env.entries=security"

alias dd="cd ~/dd"
alias w="cd ~/dd/web-ui"

alias vs="code ~/Library/Application\ Support/Code/User/settings.json"

alias fix-staging="branches-status staging fix"
