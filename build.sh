#!/bin/sh

cd ~/github/dariah
if [[ "$1" == "docs" ]]; then
    cd docs
    bundle exec jekyll serve
elif [[ "$1" == "dev" ]]; then
    cd client
    export NODE_ENV="development"
    webpack
elif [[ "$1" == "serve" ]]; then
    cd client
    export NODE_ENV="development"
    webpack-dev-server
elif [[ "$1" == "prod" ]]; then
    cd client
    pushd ../docs
    bundle exec jekyll build
    popd
    export NODE_ENV="production"
    webpack -p
elif [[ "$1" == "data" ]]; then
    cd static/tools
    python3 mongoFromFm.py
else
    echo "Unknown argument '$1'"
fi
