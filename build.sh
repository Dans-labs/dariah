#!/bin/sh

root=`pwd`

function codestats {
    cd $root
    xd="__pycache__,node_modules,.tmp"
    xf="cloc_exclude.lst"
    rf="docs/Stats.md"
    client/node_modules/cloc/lib/cloc --exclude_dir=$xd --exclude-list-file=$xf --report-file=$rf --md .
    cat $rf
}

if [[ "$1" == "module" ]]; then
    cd client
    if [[ "$2" == "" ]]; then
        npm install
    else
        npm install --save-dev $2
    fi
elif [[ "$1" == "xmodule" ]]; then
    cd client
    if [[ "$2" == "" ]]; then
        echo "pass module to remove as argument"
    else
        npm remove --save-dev $2
    fi
elif [[ "$1" == "stats" ]]; then
    codestats
elif [[ "$1" == "test" ]]; then
    cd client
    export NODE_ENV="development"
    if [[ "$2" == "" ]]; then
        npm test  'src/js/test/**/*.js'
    else
        npm test src/js/test/$2.js
    fi
elif [[ "$1" == "devenv" ]]; then
    # documentation server
    pushd docs
    bundle exec jekyll serve &
    popd
    # hot module reload client app builder and server
    pushd client
    export NODE_ENV="development"; webpack-dev-server &
    popd
    # development webserver
	pushd server
    python3 confyg.py models
    export REGIME=devel; python3 -m bottle --debug --reload --bind localhost:8001 index:app
elif [[ "$1" == "docs" ]]; then
    codestats
    cd docs
    bundle exec jekyll serve
elif [[ "$1" == "dev" ]]; then
    cd client
    export NODE_ENV="development"
    webpack
elif [[ "$1" == "serve" ]]; then
	cd server
    python3 confyg.py models
    export REGIME=devel; python3 -m bottle --debug --reload --bind localhost:8001 index:app
elif [[ "$1" == "hot" ]]; then
    cd client
    export NODE_ENV="development"
    webpack-dev-server
elif [[ "$1" == "data" ]]; then
    cd static/tools
    python3 mongoFromFm.py development
elif [[ "$1" == "prod" ]]; then
    codestats
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    export NODE_ENV="production"
    webpack -p
    popd
elif [[ "$1" == "shipdocs" ]]; then
    codestats
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    popd
    git add --all .
    git commit -m "docs: $2"
    git push origin master
elif [[ "$1" == "shipcode" ]]; then
    codestats
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
    echo "module: install all modules in package.json from npm"
    echo "module \$1: install single module"
    echo "xmodule \$1: remove single module"
    echo "stats: collect codebase statistics"
    echo "test: run all tests"
    echo "test \$1: run specific test"
    echo "devenv: start development services: webserver, docserver, client app server"
    echo "serve: start the bottle webserver"
    echo "docs: build and serve github pages documentation locally"
    echo "dev: build the client (js and sass and css)"
    echo "hot: build the client and serve it locally with hot module reload"
    echo "data: convert the data from FileMaker and import it into MongoDB"
    echo "prod: make a production build of the client app; also build docs"
    echo "shipdocs: build the docs, commit them to the repo, and push them to github. Supply a commit message!"
    echo "shipcode: make a production build, build the docs, commit to the repo, and push to github. Supply a commit message!"
    echo "shipdata: convert the data from FileMaker, import them into Mongo, and scp them to the server" 
fi
