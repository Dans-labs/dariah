#!/bin/sh

cd controllers
python3 -m bottle --debug --reload --bind localhost:8001 app
