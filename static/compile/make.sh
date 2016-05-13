#!/bin/sh

cat ../cssrc/*.css > all.txt
echo 'XXXXXXXXXX' >> all.txt
cat ../jsrc/*.js  >> all.txt

python make.py $1

rm all.txt
