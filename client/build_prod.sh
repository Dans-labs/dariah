#!/bin/sh

export NODE_ENV=production
echo ';' > ../static/js/lib.js
# rm ../static/js/app.js.map
gulp prod

# convert country notebook to HTML

pushd ../static/tools/country_compose
jupyter nbconvert countries.ipynb
popd
