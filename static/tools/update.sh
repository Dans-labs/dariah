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
cd $ADIR/web2py
python -c "import gluon.compileapp; gluon.compileapp.compile_application('applications/admin')"
python -c "import gluon.compileapp; gluon.compileapp.compile_application('applications/$APP')"

# the following script creates a logging.conf in the web2py directory.
# This file must be removed before the webserver starts up, otherwise httpd wants to write web2py.log, which is generally not allowed
# and especially not under linux.
# Failing to remove this file will result in an Internal Server Error by $APP!
python web2py.py -Q -S $APP -M -R scripts/sessions2trash.py -A -o -x 600000

cd applications/admin
python -m compileall models modules
cd $ADIR/$APP
python -m compileall models modules
if [ $ON_CLARIN ]; then
    chown apache:apache $SH_ADIR/web2py/web2py.log
    chown apache:apache $SH_ADIR/web2py/welcome.w2p
fi
sleep 1

cd $ADIR/$APP

# Here we clean the logging.conf script as promised above.
cd $ADIR/web2py
if [ -e logging.conf ]; then
    rm logging.conf
fi

sleep 2

if [ $ON_CLARIN ]; then
    service httpd start
fi

