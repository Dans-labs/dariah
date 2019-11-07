#!/bin/sh

root=`pwd`

function codestats {
    cd $root
    xd="__pycache__,node_modules,.tmp,.git,_temp,.ipynb_checkpoints,images,fonts,favicons,.sass_cache,site,_site,_sass,compiled"
    rf="stats.md"
    cloc --no-autogen --exclude_dir=$xd --report-file=$rf .
    cat $rf
}

if [[ "$1" == "mongo" ]]; then
    mongod -f /usr/local/etc/mongod.conf
elif [[ "$1" == "serve" ]]; then
	cd server
    export PYTHONDONTWRITEBYTECODE=1 REGIME=devel FLASK_APP=index:factory FLASK_ENV=development FLASK_RUN_PORT=8001; python3 -m flask run
elif [[ "$1" == "serveprod" ]]; then
	cd server
    export PYTHONDONTWRITEBYTECODE=1 REGIME=devel FLASK_APP=index:factory FLASK_RUN_PORT=8001; python3 -m flask run
elif [[ "$1" == "stats" ]]; then
    codestats
else
    if [[ "$1" != "help" && "$1" != "--help" && "$1" != "" ]]; then
        echo "Unknown argument '$1'"
    fi
    echo "./build.sh <task>"
    echo "    where <task> is one of:"
#    echo "python      : activate the version of python used for dariah"
    echo "mongo       : development - start mongo db daemon"
    echo "serve       : development - start webserver"
    echo "serveprod   : development - start webserver, but not in development mode"
    echo "stats       : reporting - collect codebase statistics"
fi
