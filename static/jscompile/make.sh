#!/bin/sh

cat ../jsrc/*.js | python strip.py $1 > ../js/inkind.min.js
stat -f 'RESULT              : %z bytes' ../js/inkind.min.js
