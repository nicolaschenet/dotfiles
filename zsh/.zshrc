for DOTFILE in `find /Users/nicolas.chenet/.dotfiles/zsh/chunks`
do
  [ -f $DOTFILE ] && source $DOTFILE
done
