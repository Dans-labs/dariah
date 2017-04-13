cd ~/github/dariah/client
if [[ "$1" == "dev" ]]; then
    export NODE_ENV="development"
    webpack
elif [[ "$1" == "serve" ]]; then
    export NODE_ENV="development"
    webpack-dev-server
elif [[ "$1" == "prod" ]]; then
    export NODE_ENV="production"
    webpack -p
else
    echo "Unknown argument '$1'"
fi
