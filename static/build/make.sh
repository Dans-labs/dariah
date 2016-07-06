#!/bin/sh

cd ../jsrc

echo "Babel"
if [ "$1" == "-d" ]; then
    babel *.js --no-babelrc --minified --no-comments --presets es2015 -d ../jslib -q
else
    babel *.js --no-babelrc --minified --no-comments --presets es2015 --plugins transform-remove-console -d ../jslib -q
fi

echo "Browserify"
browserify ../jslib/main.js -o ../jslib/bundle.js

echo "Uglify"
if [ "$1" == "-d" ]; then
    cp ../jslib/bundle.js ../js/app.min.js
else
    uglifyjs ../jslib/bundle.js -o ../js/app.min.js -m
fi

echo "Sass"
sass --style=compact --sourcemap=auto ../cssrc/main.scss:../css/app.min.css

