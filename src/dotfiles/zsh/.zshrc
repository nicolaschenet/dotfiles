for SCRIPT in `find $HOME/.dotfiles/src/dotfiles/zsh/scripts`
do
  [ -f $SCRIPT ] && source $SCRIPT
done
