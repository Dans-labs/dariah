#!/bin/sh

cd ~/projects/has/dacs/sql
mysql -u root < create.sql
mysql -u root < data.sql
