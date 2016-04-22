#!/bin/sh

cat ../jsrc/*.js | python strip.py > ../js/inkind.min.js
