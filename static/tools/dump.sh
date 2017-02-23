#!/bin/sh

# USAGE
# 
# ./dump.sh

# dumps mongo database data for the DARIAH application

filename=dariah_data
destserver="dirkr@tclarin11.dans.knaw.nl"
destdir="/home/dirkr"

pushd ~/Downloads
rm -rf $filename
mongodump -o $filename -d dariah
ssh $destserver "rm -rf $filename" 
scp -r $filename $destserver:$destdir
popd
