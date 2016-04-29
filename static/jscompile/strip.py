# my own minifier
# before aggressively removing whitespace, I escape all `` strings; I put them back later.

import sys, re
strings = []
escape_strings = re.compile('`([^`]*)`')
insert_strings = re.compile('```')

i = -1

def string_away(match):
    strings.append(match.group(1))
    return '```'

def string_back(match):
    global i
    i += 1
    return '`'+strings[i]+'`'

comment1 = re.compile('/\*.*?\*/', re.S)
comment2 = re.compile('//.*')
trim1 = re.compile('\s+', re.S)
trim2 = re.compile('\s*([{};=,:\[\]()])\s*')

def t2_repl(match): return match.group(1)

text = sys.stdin.read()
sys.stderr.write('{} chars\n'.format(len(text)))
text = comment1.sub('', text.strip())
text = comment2.sub('', text.strip())
sys.stderr.write('{} chars\n'.format(len(text)))

text = escape_strings.sub(string_away, text.strip())
text = trim1.sub(' ', text.strip())
text = trim2.sub(t2_repl, text.strip())
text = insert_strings.sub(string_back, text.strip())
sys.stderr.write('{} chars\n'.format(len(text)))
sys.stdout.write(text)

