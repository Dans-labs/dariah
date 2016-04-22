#!/usr/bin/env python
# -*- coding: utf-8 -*-

request.requires_https()

from get_db_config import config

dc_u = config['dariah_user']
dc_p = config['dariah_passwd']
dc_h = config['dariah_host']

db = DAL('mysql://{}:{}@{}/{}'.format(
        config['dariah_user'],
        config['dariah_passwd'],
        config['dariah_host'],
        'dariah_web',
    ),
    migrate_enabled=False, # if session table already exists
    #migrate=False, # if session table does not yet exist
)

dbd = DAL('mysql://{}:{}@{}/{}'.format(
        config['dariah_user'],
        config['dariah_passwd'],
        config['dariah_host'],
        'dariah_data',
    ),
    migrate_enabled=False, # if session table already exists
    #migrate=False, # if session table does not yet exist
)

# Indeed, we store sessions in the database:
session.connect(request, response, db=db)
response.generic_patterns = ['*'] if request.is_local else ['*.json']

from gluon.tools import Auth, Crud, Service, PluginManager, prettydate
auth = Auth(db, secure=True) # secure=True should enforce https for auth
crud, service, plugins = Crud(db), Service(), PluginManager()
service = Service()
plugins = PluginManager()
# auth.define_tables(username=False, signature=False, migrate=True) # if auth tables do not exist
auth.define_tables(username=False, signature=False, migrate=False) # if auth tables exist

## configure email
mail = auth.settings.mailer
mail.settings.server = 'localhost' #'logging' or 'smtp.gmail.com:587'
mail.settings.sender = 'shebanq@ancient-data.org'
mail.settings.login = None #'username:password'
mail.settings.tls = None

## configure auth policy
auth.settings.registration_requires_verification = False
auth.settings.registration_requires_approval = False
auth.settings.reset_password_requires_verification = False
#If the user tried to access the register page but is already logged in, redirect to profile.
auth.settings.logged_url = URL('user', args='profile')

from gluon.contrib.login_methods.rpx_account import use_janrain
use_janrain(auth, filename='private/janrain.key')

auth.messages.logged_in = None
auth.messages.logged_out = None
