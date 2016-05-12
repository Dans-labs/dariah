# my own minifier
# before aggressively removing whitespace, I escape all `` strings; I put them back later.

import sys, collections, re

dev_mode = False
verbose = False
do_names = 0
for x in sys.argv[1:]:
    if x == '-d': dev_mode = True
    elif x == '-v': verbose = True
    elif x == '-n': do_names = -1
    elif x == '+n': do_names = 1

banner = 'DEVELOP' if dev_mode else 'PRODUCTION'
banner += ' ( '
banner += 'ONLY name mangling' if do_names == 1 else 'EXCEPT name mangling' if do_names == -1 else 'WITH mangling'
banner += ' )\n'
sys.stderr.write(banner)

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
comment3 = re.compile('<!--.*?-->', re.S)
trim1 = re.compile('\s+', re.S)
trim2 = re.compile('\s*([{};=,:\[\]()])\s*')
trim3 = re.compile('[,;]([\]\)\}])')
console = re.compile('^\s*console.log.*$', re.M)
names = re.compile('(º[A-Za-z0-9_]+)')

def t2_repl(match): return match.group(1)
def t3_repl(match): return match.group(1)

names_from = 'lower'

if names_from == 'chinese':
    uni_ranges = ((0x3400, 0x4DB5),)
elif names_from == 'lower':
    uni_ranges = ((0x0061, 0x007A),(0x0041, 0x005A))

exclude = set('aeiou') # to prevent keywords
unichars = []
for (b,e) in uni_ranges:
    for c in range(b, e+1):
        u = chr(c)
        if u not in exclude: unichars.append(u)

base = len(unichars)

def base_rep(i):
    if i < base: return unichars[i]
    return base_rep(int(i / base))+base_rep(i % base)

def mangle_names(txt):
    namelist = names.findall(txt)
    nms = collections.Counter()
    for nm in namelist: nms[nm] += 1
    if verbose:
        sys.stderr.write('{:>4} names found\n'.format(len(nms)))
    nmsorted = sorted(nms.items(), key=lambda x: (-x[1], x[0]))
    nmsortedl = sorted(nms, key=lambda x: -len(x))
    nmmap = dict((x[1][0], base_rep(x[0])) for x in enumerate(nmsorted))
    if verbose:
        for (nm, n) in nmsorted:
            sys.stderr.write('{:>4}x {:<20} => {}\n'.format(n, nm, nmmap[nm])) 
    for nm in nmsortedl:
        nmpat = re.compile(nm)
        txt = nmpat.sub(nmmap[nm], txt)
    return txt

msgfmt = '{:<20}: {:>5} chars\n'
text = sys.stdin.read()
sys.stderr.write(msgfmt.format('SOURCE', len(text)))

if not dev_mode:

    if do_names != 1:
        text = console.sub('', text.strip())
        sys.stderr.write(msgfmt.format('CONSOLE', len(text)))

        text = comment1.sub('', text.strip())
        text = comment2.sub('', text.strip())
        text = comment3.sub('', text.strip())
        sys.stderr.write(msgfmt.format('COMMENTS', len(text)))

        text = escape_strings.sub(string_away, text.strip())
        text = trim1.sub(' ', text.strip())
        text = trim2.sub(t2_repl, text.strip())
        text = trim3.sub(t3_repl, text.strip())
        text = insert_strings.sub(string_back, text.strip())
        sys.stderr.write(msgfmt.format('WHITE SPACE', len(text)))

    if do_names >= 0:
        text = mangle_names(text)
        sys.stderr.write(msgfmt.format('NAMES', len(text)))

sys.stdout.write(text)

