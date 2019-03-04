#!/bin/sh

# use the right python
# source ~/local/python/dariah/bin/activate

root=`pwd`
webpack='node_modules/.bin/webpack'

function codestats {
    cd $root
    xd="__pycache__,node_modules,.tmp,.git,_temp,.ipynb_checkpoints,images,fonts,favicons,.sass_cache,_site,_sass,compiled"
    xf="cloc_exclude.lst"
    rf="docs/Stats.md"
    client/node_modules/cloc/lib/cloc --no-autogen --exclude_dir=$xd --exclude-list-file=$xf --report-file=$rf --md . ../dariah.wiki
    cat $rf
}

# if [[ "$1" == "python" ]]; then
#    source ~/local/python/dariah/bin/activate
#    bash
if [[ "$1" == "mongo" ]]; then
    mongod -f /usr/local/etc/mongod.conf 
elif [[ "$1" == "module" ]]; then
    cd client
    if [[ "$2" == "" ]]; then
        npm install
    else
        shift
        npm install --save-dev "$@"
    fi
elif [[ "$1" == "xmodule" ]]; then
    cd client
    if [[ "$2" == "" ]]; then
        echo "pass module to remove as argument"
    else
        shift
        npm remove --save-dev "$@"
    fi
elif [[ "$1" == "stats" ]]; then
    codestats
elif [[ "$1" == "test" ]]; then
    cd client
    export NODE_ENV="development"
    if [[ "$2" == "" ]]; then
        npm test  'src/js/test/**/*.js'
    else
        npm test "src/js/test/$2.js"
    fi
elif [[ "$1" == "docs" ]]; then
    codestats
    cd docs
    bundle exec jekyll serve
elif [[ "$1" == "dev" ]]; then
    cd client
    export NODE_ENV="development"
    $webpack --mode=development --config webpack.dev.js
elif [[ "$1" == "model" ]]; then
	cd server
    python3 compile.py
elif [[ "$1" == "serve" ]]; then
	cd server
    python3 compile.py
    export REGIME=devel FLASK_APP=index:factory FLASK_ENV=development FLASK_RUN_PORT=8001; python3 -m flask run
elif [[ "$1" == "servehot" ]]; then
	cd server
    python3 compile.py
    export REGIME=hot FLASK_APP=index:factory FLASK_ENV=development FLASK_RUN_PORT=8001; python3 -m flask run
elif [[ "$1" == "hot" ]]; then
    cd client
    export NODE_ENV="development"
    $webpack-dev-server --mode=development --config webpack.dev.js
elif [[ "$1" == "data" ]]; then
    cd static/tools
    python3 mongoFromFm.py development
elif [[ "$1" == "root" ]]; then
    cd static/tools
    python3 mongoFromFm.py development -r
elif [[ "$1" == "prod" ]]; then
    pushd client
    export NODE_ENV="production"
    $webpack --mode=production --config webpack.prod.js
    popd
elif [[ "$1" == "shipdocs" ]]; then
    shift
    codestats
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    popd
    git add --all .
    git commit -m "docs: $*"
    git push origin master
elif [[ "$1" == "shipcode" ]]; then
    shift
    codestats
    pushd client
    pushd ../docs
    bundle exec jekyll build
    popd
    export NODE_ENV="production"
    $webpack --mode=production --config webpack.prod.js
    popd
    git add --all .
    git commit -m "ship: $*"
    git push origin master
elif [[ "$1" == "shipdata" ]]; then
    git add --all .
    git commit -m "ship legacy data"
    git push origin master
    cd static/tools
    ./dump.sh
else
    if [[ "$1" != "help" && "$1" != "--help" && "$1" != "" ]]; then
        echo "Unknown argument '$1'"
    fi
    echo "./build.sh <task>"
    echo "    where <task> is one of:"
#    echo "python      : activate the version of python used for dariah"
    echo "module      : js module management - install all modules in package.json from npm"
    echo "module \$1   : js module management - install single module \$1"
    echo "xmodule \$1  : js module management - remove single module \$1"
    echo "stats       : reporting - collect codebase statistics"
    echo "test        : testing - run all tests"
    echo "test \$1     : testing - run specific test \$1"
    echo "model       : development - compile data model"
    echo "serve       : development - start webserver"
    echo "servehot    : development - start webserver tuned to webpack devserver"
    echo "docs        : development - build and serve github pages documentation"
    echo "dev         : development - build client app (js and css)"
    echo "hot         : development - start client app server with hot module reload"
    echo "data        : development - convert legacy FileMaker data and import it into MongoDB"
    echo "root        : development - assign role root to user indicated in config file"
    echo "prod        : production - build client app"
    echo "shipdocs \$  : production - build docs, commit and push to github. \$=commit message"
    echo "shipcode \$1 : production - build client app and docs, commit and push to github. \$=commit message!"
    echo "shipdata    : production - transfer Filemaker legacy data to production server" 
fi

# back to normal python
# deactivate
