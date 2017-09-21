#!/bin/sh

# USAGE
# 
# ./load.sh

# loads legacy data into mongo database data for the DARIAH application
# Legacy data consists of documents that have a field isPristine: true
#
# The import script removes existing pristine data from the database,
# then imports the new pristine data into the database, except for those
# records where a non pristine version is already in the database.
#
# The DARIAH app takes care that when a record is modified, the isPristine field disappears.

python3 mongoFromFm.py production
