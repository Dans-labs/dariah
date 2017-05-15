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
    if [[ "$1" != "help" && "$1" != "--help" && "$1" != "" ]]; then
        echo "Unknown argument '$1'"
    fi
    echo "./build.sh <task>"
    echo "    where <task> is one of:"
    echo "docs: build and serve github pages documentation locally"
    echo "dev: build the client (js and sass and css)"
    echo "serve: build the client and serve it locally with hot module reload"
    echo "data: convert the data from FileMaker and import it into MongoDB"
    echo "prod: make a production build of the client app; also build docs"
    echo "shipdocs: build the docs, commit them to the repo, and push them to github"
    echo "shipcode: make a production build, build the docs, commit to the repo, and push to github"
    echo "shipdata: convert the data from FileMaker, import them into Mongo, and scp them to the server" 
fi
