#!/bin/sh

# USAGE
# 
# ./load.sh

# loads mongo database data for the DARIAH application

filename=dariah_data.mongo

push ~
mongorestore --drop -d dariah $filename
popd
