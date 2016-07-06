#!/bin/sh

if [ $HOSTNAME == "tclarin11.dans.knaw.nl" ]; then
    datadir="/home/dirkr"
else
    datadir="/Users/dirk/projects/has/dacs/sql"
fi

echo "cd $datadir"
cd "$datadir"

mysql -u root < create.sql
mysql -u root < data.sql
