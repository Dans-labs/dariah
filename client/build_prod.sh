#!/bin/sh

export NODE_ENV=production
gulp prod

# convert country notebook to HTML

pushd ../static/tools/country_compose
jupyter nbconvert countries.ipynb
popd