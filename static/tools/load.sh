#!/bin/bash
# This a the script that you can run on the production server of DARIAH to update the data

# run it as follows:
#
# ./load.sh                              
# ./load.sh -r
#

# WITHOUT arguments:
#
# loads legacy data into mongo database data for the DARIAH application
# Legacy data consists of documents that have a field isPristine: true
#
# The import script removes existing pristine data from the database,
# then imports the new pristine data into the database, except for those
# records where a non pristine version is already in the database.
#
# The DARIAH app takes care that when a record is modified, the isPristine field disappears.
# This script is set up to work at specific servers.
# Currently it supports 
#   tclarin11.dans.knaw.nl (SELINUX)

# WITH argument -r
# Does not perform data import, but does a modification:
# It assigns the role 'root' to a user, configured as rootUser in the config file

# ADIR   : directory where the web app $APP resides (and also web2py itself)

APP="dariah"

if [ "$HOSTNAME" == "tclarin11.dans.knaw.nl" ]; then
        ON_CLARIN=1
        ADIR="/opt/web-apps"
fi

if [ "$1" == "-r" ]; then
    python3 mongoFromFm.py production -r
else
    if [ $ON_CLARIN ]; then
        service httpd stop
    fi

    cd $ADIR/$APP
    git pull origin master

    cd static/tools
    python3 mongoFromFm.py production $*

    if [ $ON_CLARIN ]; then
        service httpd start
    fi
fi
