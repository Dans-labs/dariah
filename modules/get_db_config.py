config = dict(inkind_user='inkind')
config_path = '/opt/inkind/pwd.cfg'
with open(config_path) as p:
    config['inkind_passwd'] = p.read().rstrip('\n')
config_path = '/opt/inkind/host.cfg'
with open(config_path) as p:
    config['inkind_host'] = p.read().rstrip('\n')
