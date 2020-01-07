# The secrets file has to be located either on the user's home directory
# or where .zshrc is located
FILE=$([[ -f $HOME/.secrets ]] && echo "$HOME/.secrets" || echo ".secrets")

if [ -f "$FILE" ]; then
    while IFS=: read -r f1 f2
    do
        export $f1="$f2"
    done < "$FILE"
else
    echo "$FILE does not exist, skipping..."
fi
