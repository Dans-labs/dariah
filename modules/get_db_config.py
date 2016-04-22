config = dict(dariah_user='dariah')
config_path = '/opt/dariah/pwd.cfg'
with open(config_path) as p:
    config['dariah_passwd'] = p.read().rstrip('\n')
config_path = '/opt/dariah/host.cfg'
with open(config_path) as p:
    config['dariah_host'] = p.read().rstrip('\n')
