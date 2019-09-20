#!/bin/sh

if [[ "$1" == "mongo" ]]; then
    mongod -f /usr/local/etc/mongod.conf
elif [[ "$1" == "serve" ]]; then
	cd server
    export REGIME=devel FLASK_APP=index:factory FLASK_ENV=development FLASK_RUN_PORT=8001; python3 -m flask run
else
    if [[ "$1" != "help" && "$1" != "--help" && "$1" != "" ]]; then
        echo "Unknown argument '$1'"
    fi
    echo "./build.sh <task>"
    echo "    where <task> is one of:"
#    echo "python      : activate the version of python used for dariah"
    echo "mongo       : development - start mongo db daemon"
    echo "serve       : development - start webserver"
fi
