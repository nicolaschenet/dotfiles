for SCRIPT in `find $HOME/.dotfiles/src/dotfiles/zsh/scripts`
do
  [ -f $SCRIPT ] && source $SCRIPT
done

export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
