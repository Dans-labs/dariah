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
elif [[ "$1" == "data" ]]; then
    cd static/tools
    python3 mongoFromFm.py development
elif [[ "$1" == "prod" ]]; then
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    export NODE_ENV="production"
    webpack -p
    popd
elif [[ "$1" == "shipdocs" ]]; then
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    popd
    git add --all .
    git commit -m "docs: $2"
    git push origin master
elif [[ "$1" == "shipcode" ]]; then
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    export NODE_ENV="production"
    webpack -p
    popd
    git add --all .
    git commit -m "ship: $2"
    git push origin master
elif [[ "$1" == "shipdata" ]]; then
    cd static/tools
    python3 mongoFromFm.py production
    ./dump.sh
else
    echo "Unknown argument '$1'"
fi
