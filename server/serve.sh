#!/bin/sh

python3 confyg.py controllers/models

cd controllers
export REGIME=devel
python3 -m bottle --debug --reload --bind localhost:8001 index:app
