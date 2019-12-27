for CHUNK in `find /Users/nicolas.chenet/.dotfiles/zsh/chunks`
do
  [ -f $CHUNK ] && source $CHUNK
done
