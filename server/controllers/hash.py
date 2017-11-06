import os
from datetime import datetime, timedelta
from hashlib import pbkdf2_hmac
from binascii import hexlify
from hmac import compare_digest

# When you sign a piece of data:
# store a salt and an expiration date in the database
# Sign the material together with the salt and the expiration data
# When checking do the following:
# find the hash value back in a table
# if found, retrieve the expiration date from the table, and if passed the expiration date: report: expired or not found

# Make a global collection of hashes
# Each hash document contains:
# - the hash
# - the expiration date
# - the salt
# - a table name
# - a field name
# - an identification (e.g. an email address)
# - an action code (set or add)

# Whenever a user logs in into the system with a hash in the querystring (?adddme=45ab035cd...)
# a lookup will take place.
# 
# Upon checking a hash with success:
# Additional checks:
# - is it before the expiration date?
# - does the email address of the current user match the identification?

# If satisfied:
# - that field in that table will be receive the uid of the current user (either added or replaced)
# If not:
# - it will be reported to the user as warning: either: not found or: expired, or: wrong email address.

now = datetime.utcnow()
expired = now + timedelta(days=30)

print(now)
print(expired)

salt = os.urandom(16)

def hash(data, expired): return pbkdf2_hmac('sha256', data+bytes(str(expired), encoding='utf-8'), salt, 100000)

material =  b'reviewer for SHEBANQ'
signed = hash(material, expired) 
signedHex = hexlify(signed)

print('''
Material = {}
Salt     = {}
Hash     = {}
'''.format(
    material, salt, signedHex,
))

good = compare_digest(hash(material, expired), signed)
print(good)

good = compare_digest(hash(material+b' ', expired), signed)
print(good)
