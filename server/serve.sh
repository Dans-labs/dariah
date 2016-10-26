#!/bin/sh

cd controllers
export REGIME=devel
python3 -m bottle --debug --reload --bind localhost:8001 index:app
