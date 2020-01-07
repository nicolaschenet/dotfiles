for SCRIPT in `find $HOME/.dotfiles/zsh/scripts`
do
  [ -f $SCRIPT ] && source $SCRIPT
done
