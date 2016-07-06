#!/bin/sh

cd ../jsrc

echo "babel $1"
DEBUG='*'
export DEBUG
time babel $1 --presets es2015 -d ../jslib >& $1.txt
