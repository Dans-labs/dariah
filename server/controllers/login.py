import logging
from datetime import datetime, timedelta
import bottle
from beaker.middleware import SessionMiddleware
from cork import Cork
from cork.mongodb_backend import MongoDBBackend

from data import UserApi

User = UserApi()

logging.basicConfig(format='localhost - - [%(asctime)s] %(message)s', level=logging.DEBUG)
log = logging.getLogger(__name__)
bottle.debug(True)

# Use users.json and roles.json in the local example_conf directory
aaa = Cork(
    backend=MongoDBBackend(
        db_name='dariah',
    ),
    email_sender='dirk.roorda@dans.knaw.nl',
    smtp_url='smtp://smtp.magnet.ie',
)

app = bottle.default_app()

session_opts = {
    'session.cookie_expires': True,
    'session.encrypt_key': 'xy45hgd947shfp739fgqoxkgla7c5',
    'session.httponly': True,
    'session.timeout': 3600 * 24,  # 1 day
    'session.type': 'cookie',
    'session.validate_key': True,
}
app = SessionMiddleware(app, session_opts)

def is_devel():
    hkey = 'REMOTE_ADDR'
    hval = '127.0.0.1'
    env = bottle.request.environ
    return hkey not in env or env[hkey] == '127.0.0.1'

# #  Bottle methods  # #

def postd():
    return bottle.request.forms


def post_get(name, default=''):
    return bottle.request.POST.get(name, default).strip()


@bottle.post('/login')
def login():
    """Authenticate users"""
    username = post_get('username')
    password = post_get('password')
    aaa.login(username, password, success_redirect='/', fail_redirect='/login')

@bottle.route('/user_is_anonymous')
def user_is_anonymous():
    if aaa.user_is_anonymous:
        return 'True'

    return 'False'

@bottle.route('/logout')
def logout():
    aaa.logout(success_redirect='/login')


@bottle.post('/register')
def register():
    """Send out registration email"""
    User.store_user(name=post_get('username'), email=post_get('email_address'), password=post_get('password'))
    aaa.register(post_get('username'), post_get('password'), post_get('email_address'))
    return 'Please check your mailbox.'


@bottle.route('/validate_registration/:registration_code')
def validate_registration(registration_code):
    """Validate registration, create user account"""
    aaa.validate_registration(registration_code)
    return 'Thanks. <a href="/login">Go to login</a>'


@bottle.post('/reset_password')
def send_password_reset_email():
    """Send out password reset email"""
    aaa.send_password_reset_email(
        username=post_get('username'),
        email_addr=post_get('email_address')
    )
    return 'Please check your mailbox.'


@bottle.route('/change_password/:reset_code')
@bottle.view('password_change_form')
def change_password(reset_code):
    """Show password change form"""
    return dict(reset_code=reset_code)


@bottle.post('/change_password')
def change_password():
    """Change password"""
    aaa.reset_password(post_get('reset_code'), post_get('password'))
    return 'Thanks. <a href="/login">Go to login</a>'


#@bottle.route('/')
#def index():
#    """Only authenticated users can see this"""
#    aaa.require(fail_redirect='/login')
#    return 'Welcome! <a href="/admin">Admin page</a> <a href="/logout">Logout</a>'


@bottle.route('/restricted_download')
def restricted_download():
    """Only authenticated users can download this file"""
    aaa.require(fail_redirect='/login')
    return bottle.static_file('static_file', root='.')


@bottle.route('/my_role')
def show_current_user_role():
    """Show current user role"""
    session = bottle.request.environ.get('beaker.session')
    print("Session from simple_webapp", repr(session))
    aaa.require(fail_redirect='/login')
    return aaa.current_user.role


# Admin-only pages

@bottle.route('/admin')
@bottle.view('admin_page')
def admin():
    """Only admin users can see this"""
    aaa.require(role='admin', fail_redirect='/sorry_page')
    return dict(
        current_user=aaa.current_user,
        users=aaa.list_users(),
        roles=aaa.list_roles()
    )


@bottle.post('/create_user')
def create_user():
    try:
        aaa.create_user(postd().username, postd().role, postd().password)
        return dict(ok=True, msg='')
    except Exception as e:
        return dict(ok=False, msg=e.message)


@bottle.post('/delete_user')
def delete_user():
    try:
        aaa.delete_user(post_get('username'))
        return dict(ok=True, msg='')
    except Exception as e:
        print(repr(e))
        return dict(ok=False, msg=e.message)


@bottle.post('/create_role')
def create_role():
    try:
        aaa.create_role(post_get('role'), post_get('level'))
        return dict(ok=True, msg='')
    except Exception as e:
        return dict(ok=False, msg=e.message)


@bottle.post('/delete_role')
def delete_role():
    try:
        aaa.delete_role(post_get('role'))
        return dict(ok=True, msg='')
    except Exception as e:
        return dict(ok=False, msg=e.message)


# Static pages

@bottle.route('/login')
@bottle.view('login_form')
def login_form():
    """Serve login form"""

    def getUser():
        if is_devel():
            return dict(
                authenticated=True,
                eppn='dirk',
                email='dirk@x.y',
            )
        else:
            sKey = 'Shib-Session-ID'
            authenticated =  sKey in env and env[sKey] 
            return dict(
                authenticated=True,
                eppn=env['eppn'],
                email=env['mail'],
            ) if authenticated else dict(
                authenticated=False,
            )

    userInfo = getUser()
    if userInfo['authenticated']:
        aaa.login(userInfo['eppn'], '', success_redirect='/', fail_redirect='/')
    else:
        bottle.redirect('/')

    '''
    userInfo = getUser()
    if userInfo['authenticated']:
        eppn = userInfo['eppn']
        email = userInfo['email']
        existingUser = User.getUser(eppn)
        if existingUser:
            pass
        else:
            User.storeUser(
                eppn=eppn,
                email=email,
                dateCreated=datetime.utcnow(),
            )
        # Setup session data
        # self._setup_cookie(eppn)
        bottle.redirect('/')
    else:
        bottle.redirect('/')
    '''
    return {}


@bottle.route('/sorry_page')
def sorry_page():
    """Serve sorry page"""
    return '<p>Sorry, you are not authorized to perform this action</p>'

