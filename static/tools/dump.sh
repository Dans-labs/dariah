#!/bin/sh

# USAGE
# 
# ./dump.sh

# dumps mongo database data for the DARIAH application

filename=dariah_data.mongo
destserver="dirkr@tclarin11.dans.knaw.nl"
destdir="/home/dirkr"

pushd ~/Downloads
mongodump --archive=$filename -d dariah
scp -r $filename $destserver:$destdir
popd
