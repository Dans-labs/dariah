#!/bin/bash
# This a the script that you can run on the production server of DARIAH to update the code and the data

# run it as follows:
#
# ./update.sh                              # if only code or docs has changed
#

# This script is set up to work at specific servers.
# Currently it supports 
#   tclarin11.dans.knaw.nl (SELINUX)

# ADIR   : directory where the web app $APP resides (and also web2py itself)

APP="dariah"

if [ "$HOSTNAME" == "tclarin11.dans.knaw.nl" ]; then
        ON_CLARIN=1
        ADIR="/opt/web-apps"
fi

if [ $ON_CLARIN ]; then
    service httpd stop
fi

cd $ADIR/$APP
git pull origin master

if [ $ON_CLARIN ]; then
    service httpd start
fi

