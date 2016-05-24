# my own minifier for css and js
# before aggressively removing whitespace, I escape all `` strings; I put them back later.

import sys, collections, re

defs = re.compile(r'«([^\n»]+)»[\s\n]*≤([^≥]*)≥')
defname = re.compile(r'«([^\n»]+)»')
comment1 = re.compile(r'/\*.*?\*/', re.S)
comment2 = re.compile(r'//.*')
comment3 = re.compile(r'<!--.*?-->', re.S)
trim1 = re.compile(r'\s+', re.S)
trim2 = re.compile(r'\s*([{};=,:\[\]()])\s*')
trim2a = re.compile(r'\s*([{};=,:()])\s*')
trim3 = re.compile(r'[,;]([\]\)\}])')
console = re.compile(r'^\s*console.log.*$', re.M)
namewarn = re.compile(r'''([^A-Za-z_0-9º]|\A)([A-Za-z_][A-Za-z_0-9]*)([^A-Za-z_0-9º]|\Z)''')
names = re.compile(r'([•º])([A-Za-z0-9_]+)')
is_name = re.compile(r'^[A-Za-z0-9_]+$')
nmspec = re.compile(r'^\s*«([^«]*)«([^»]*)»([^»]*)»\s*$')
escape_strings = re.compile(r'`([^`]*)`')
insert_strings = re.compile(r'∞')
code_in_strings = re.compile(r'\$\{([^}]*)\}')
removestr = re.compile(r'''([`'"])(.*?)(\1)''')

def t2_repl(match): return match.group(1)
def t2a_repl(match): return match.group(1)
def t3_repl(match): return match.group(1)

x_js_names_spec = '''
    «.«apply»(»
    «x«break»x»
    «x«delete»x»
    «x«else»x»
    «x«false»x»
    «x«for»(»
    «.«forEach»(»
    «x«function»x»
    «/«g»x»
    «.«height»(»
    «x«if»(»
    « «in» »
    « «in»(»
    « «in»[»
    « «in»{»
    «.«indexOf»(»
    «.«innerHeight»x»
    «.«initNamespaceStorage»(»
    «.«isSet»(»
    «.«join»(»
    «.«keys»(»
    «.«length»x»
    «.«localStorage»x»
    «.«location»x»
    «=«new» »
    «x«null»x»
    «x«Math».»
    «x«Number»(»
    «x«Object».»
    «.«prototype»=»
    «.«push»(»
    «.«replace»(»
    «x«return»x»
    «.«search»x»
    «.«slice»(»
    «.«sort»(»
    «.«split»(»
    «.«sqrt»(»
    «.«test»(»
    «x«this»x»
    «x«true»x»
    «x«typeof»(»
    «=«undefined»x»
    «x«var» »
    «x«while»(»
    «.«when»(»
    «.«when».»
    «.«width»(»
    «x«window»x»
'''.strip().split('\n')

i_js_names_spec = '''
    «.«break»x»
    «.«delete»x»
    «.«else»x»
    «.«false»x»
    «.«for»x»
    «.«function»x»
    «.«if»x»
    «.«null»x»
    «.«Math»x»
    «.«Number»x»
    «.«return»x»
    «.«this»x»
    «.«true»x»
    «.«typeof»x»
    «.«var»x»
    «.«while»x»
    «.«window»x»
'''.strip().split('\n')


x_lib_names_spec = '''
    «.«Adapter»x»
    «.«addClass»(»
    «.«ajax»(»
    «.«append»(»
    «x«appendTo»:»
    «.«attr»(»
    «x«attribute»:»
    «.«autocomplete»(»
    «.«backgroundColor»(»
    «x«backgroundColor»:»
    «.«bind»(»
    «.«click»(»
    «.«closest»(»
    «.«content»x»
    «x«contentType»:»
    «.«css»(»
    «x«cursor»:»
    «x«dataType»:»
    «x«Deferred»(»
    «.«done»(»
    «.«each»(»
    «x«fill»:»
    «.«find»(»
    «.«get»(»
    «.«getState»(»
    «.«hasClass»(»
    «.«hide»(»
    «x«History»x»
    «x«hover»:»
    «.«html»(»
    «x«initial»:»
    «x«label»:»
    «x«latLng»:»
    «.«mabObject»x»
    «.«markers»x»
    «x«markers»:»
    «x«markersSelectable»:»
    «x«markersSelectableOne»:»
    «x«markerStyle»:»
    «x«max»:»
    «x«min»:»
    «x«minLength»:»
    «x«normalizeFunction»:»
    «x«onMarkerClick»:»
    «x«onMarkerSelected»:»
    «x«onMarkerTipShow»:»
    «x«onRegionClick»:»
    «x«onRegionSelected»:»
    «x«onRegionTipShow»:»
    «.«preventDefault»(»
    «.«promise»(»
    «.«pushState»(»
    «x«regionStyle»:»
    «x«regions»:»
    «x«regionsSelectable»:»
    «x«regionsSelectableOne»:»
    «.«removeClass»(»
    «.«resolve»(»
    «x«response»:»
    «x«scale»:»
    «x«selected»:»
    «x«selectedHover»:»
    «x«series»:»
    «.«series».»
    «.«set»(»
    «x«setFocus»(»
    «x«setSelectedMarkers»(»
    «x«setSelectedRegions»(»
    «x«setValues»(»
    «.«show»(»
    «x«source»:»
    «x«stroke»:»
    «.«state»(»
    «.«then»(»
    «x«url»:»
    «.«val»(»
    «x«value»:»
    «.«value»x»
    «x«values»:»
    «.«vectorMap»(»
    «.«when»(»
'''.strip().split('\n')

i_lib_names_spec = '''
    «.«History»x»
'''.strip().split('\n')

x_app_names_spec = '''
    «/«_c_»/»
    «/«_f_»/»
    «x«app_url»x»
    «x«contrib»:»
    «x«control»:»
    «x«country»:»
    «.«country»x»
    «.«data»x»
    «x«f_contrib»:»
    «x«f_country»:»
    «x«facet»:»
    «.«good»x»
    «x«id»:»
    «x«left»:»
    «x«list»:»
    «x«m_contrib»:»
    «x«m_country»:»
    «x«middle»:»
    «.«msgs»x»
    «x«page»:»
    «.«relvals»x»
    «x«right»:»
    «x«sort»:»
    «.«state»x»
    «x«t_contrib»:»
    «x«t_country»:»
    «x«type»:»
    «.«type»x»
    «.«then»)»
    «x«url_tpl»x»
    «x«v»:»
    «.«v»x»
    «x«x»:»
    «.«x»x»
'''.strip().split('\n')

i_app_names_spec = '''
'''.strip().split('\n')

x_app_pats = ['^[A-Z][A-Z]$']

x_names = {n[0] for n in (nmspec.findall(line.strip()) for line in x_js_names_spec + x_lib_names_spec + x_app_names_spec) if n}
i_names = {n[0] for n in (nmspec.findall(line.strip()) for line in i_js_names_spec + i_lib_names_spec + i_app_names_spec) if n}

def msg(txt): sys.stderr.write('{}\n'.format(txt))

settings = dict(
    dev_mode=False,
    verbose=False,
    do_names=0,
    names_from='lower',
)

unichars = []
base = 0

def charbase(uni_ranges):
    global base
    exclude = set('aeiou') # to prevent keywords
    for (b,e) in uni_ranges:
        for c in range(b, e+1):
            u = chr(c)
            if u not in exclude: unichars.append(u)

    base = len(unichars)

def base_rep_c(i):
    if i < base: return unichars[i]
    return base_rep_c(int(i / base))+base_rep_c(i % base)

def base_rep(i, sigil):
    prefix = '•' if sigil == '•' and settings['names_from'] == 'lower' else ''
    return prefix+base_rep_c(i)

def intake():
    for x in sys.argv[1:]:
        if x == '-d': settings['dev_mode'] = True
        elif x == '-v': settings['verbose'] = True
        elif x == '-n': settings['do_names'] = -1
        elif x == '+n': settings['do_names'] = 1
        elif x == '-a': settings['names_from'] = 'lower'
        elif x == '+a': settings['names_from'] = 'chinese'
        elif x == '+a2': settings['names_from'] = 'chinese2'
        elif x == '=a': settings['names_from'] = 'canadian'

    if settings['names_from'] == 'chinese':
        uni_ranges = ((0x3400, 0x4DB5),)
    if settings['names_from'] == 'chinese2':
        uni_ranges = ((0x4E00, 0x9FD5),)
    elif settings['names_from'] == 'lower':
        uni_ranges = ((0x0061, 0x007A),(0x0041, 0x005A))
    elif settings['names_from'] == 'canadian':
        uni_ranges = ((0x1401, 0x166C),)

    charbase(uni_ranges)

    banner = 'DEVELOP' if settings['dev_mode'] else 'PRODUCTION'
    banner += ' ( '
    banner += 'ONLY name mangling' if settings['do_names'] == 1 else 'EXCEPT name mangling' if settings['do_names'] == -1 else 'WITH mangling'
    banner += ' )'

    msg(banner)

    with open('all.txt') as f: txt = f.read()

    (csstxt, jstxt) = txt.split('\nXXXXXXXXXX\n', 1)
    return (csstxt, jstxt)

def make_name_map(txt):
    namelist = names.findall(txt)
    nms = collections.Counter()
    for (sigil, nm) in namelist: nms[(sigil,nm)] += 1
    if settings['verbose']:
        msg('{:>4} names found'.format(len(nms)))
    nmsorted = sorted(nms.items(), key=lambda x: (-x[1], x[0]))
    nmmap = dict((x[1][0][0]+x[1][0][1], base_rep(x[0], x[1][0][0])) for x in enumerate(nmsorted))

    if settings['verbose']:
        for (nm, n) in nmsorted:
            nnn = ''.join(nm)
            msg('{:>4}x {:<20} => {}'.format(n, nnn, nmmap[nnn])) 
    return nmmap

def mangle_names(txt, nmmap):
    nmsortedl = sorted(nmmap, key=lambda x: -len(x))
    for nm in nmsortedl:
        nmpat = re.compile(nm)
        txt = nmpat.sub(nmmap[nm], txt)
    return txt

def collect_warn(txt):
    namewarns = []
    txt = removestr.sub("``", txt)
    pos = 0
    mt = namewarn.search(txt, pos)
    while mt: # trick: I need word with preceding and following character without consuming the following character
              # look ahead does not yield material in a back reference, so after each match I should retract the position by one
        (b, nw, e) = mt.groups()
        namewarns.append(mt.groups())
        pos = mt.end() - 1
        mt = namewarn.search(txt, pos)
    return namewarns

def name_warn(txt, strings):
    namewarns = []
    namewarns.extend(collect_warn(txt))
    for st in strings:
        for cd in code_in_strings.findall(st):
            namewarns.extend(collect_warn(cd))

    if len(namewarns):
        nws_context = collections.defaultdict(lambda: collections.Counter())
        nws = collections.Counter()
        nws_c = collections.defaultdict(lambda: collections.Counter())
        all_b = set()
        all_e = set()
        x_app_pats_c = [re.compile(p) for p in x_app_pats]

        for (b, nw, e) in namewarns:
            all_b.add(b)
            all_e.add(e)
            x = (b, nw, e) in x_names or ('x', nw, e) in x_names or (b, nw, 'x') in x_names or ('x', nw, 'x') in x_names
            i = (b, nw, e) in i_names or ('x', nw, e) in i_names or (b, nw, 'x') in i_names or ('x', nw, 'x') in i_names
            if x and not i: continue
            match_pats = False
            for p in x_app_pats_c:
                if p.search(nw):
                    match_pats = True
                    break
            if match_pats: continue
            nws[nw] += 1
            nws_c[nw]['{}{}{}'.format(b,nw,e)] += 1
        for nw in sorted(nws):
            msg('WARNING: UNPROTECTED NAME\t{:>3}x {}'.format(nws[nw], nw))
            for c in sorted(nws_c[nw]):
                msg('\t\t{:>3}x {}'.format(nws_c[nw][c], c))
        msg('{} WARNINGS'.format(len(nws)))

def dojs(txt, nmmap):
    if settings['dev_mode']: return txt

    strings = []
    i = -1
    def string_away(match):
        strings.append(match.group(1))
        return '∞'

    def string_back(match):
        nonlocal i
        i += 1
        return '`'+strings[i]+'`'

    if settings['do_names'] != 1:
        txt = console.sub('', txt.strip())
        msg(msgfmt.format('CONSOLE', len(txt)))

        txt = comment1.sub('', txt.strip())
        txt = comment2.sub('', txt.strip())
        txt = comment3.sub('', txt.strip())
        msg(msgfmt.format('COMMENTS', len(txt)))

        txt = escape_strings.sub(string_away, txt.strip())
        txt = trim1.sub(' ', txt.strip())
        txt = trim2.sub(t2_repl, txt.strip())
        txt = trim3.sub(t3_repl, txt.strip())

        name_warn(txt, strings)

        txt = insert_strings.sub(string_back, txt.strip())
        msg(msgfmt.format('WHITE SPACE', len(txt)))

        if settings['do_names'] >= 0:
            txt = mangle_names(txt, nmmap)
            msg(msgfmt.format('NAMES', len(txt)))

    return txt

def docss(txt, nmmap):

# in CSS files we allow «name» ≤value≥ definitions.
# We remove all definitions, and replace in the remaining text every «name» by its defined value.
    defitems = {}
    def defs_repl(match):
        (name, value) = match.group(1,2)
        if name in defitems: msg('WARNING: multiple definitions of «{}»'.format(name))
        others = defname.findall(value)
        if others:
            msg('WARNING: definition «{}» contains other definition calls: «{}»', format(name, '»,«'.join(others)))
        defitems[name] = value
        return ''

    txt = defs.sub(defs_repl, txt)
    msg(msgfmtd.format('DEFINITIONS', len(defitems), unit='definitions'))
    for name in sorted(defitems):
        value = defitems[name]
        pat = '«{}»'.format(name)
        if pat not in txt: msg('WARNING: definition {} not used.'.format(pat))
        else: txt = txt.replace(pat, value)
    others = defname.findall(txt)
    if others:
        msg('WARNING: no definition found for: «{}»'.format('»,«'.join(others)))
    msg(msgfmt.format('DEFINITIONS', len(txt)))

    if settings['dev_mode']: return txt

    if settings['do_names'] != 1:

        txt = comment1.sub('', txt.strip())
        txt = comment2.sub('', txt.strip())
        msg(msgfmt.format('COMMENTS', len(txt)))

        txt = trim1.sub(' ', txt.strip())
        txt = trim2a.sub(t2a_repl, txt.strip())
        msg(msgfmt.format('WHITE SPACE', len(txt)))

        if settings['do_names'] >= 0:
            txt = mangle_names(txt, nmmap)
            msg(msgfmt.format('NAMES', len(txt)))

    return txt

def main():
    global msgfmt, msgfmtd

    (csstxt, jstxt) = intake()

    nmmap = {}
    if settings['do_names'] >= 0:
        nmmap = make_name_map(csstxt+jstxt)

    for (lab, txt, do) in (('CSS', csstxt, docss), ('JS', jstxt, dojs)):
        msgfmt = '{:<3} '.format(lab)+'{:<20}: {:>5} chars'
        msgfmtd = '{:<3} '.format(lab)+'{:<20}: {:>5} definitions'
        msg(msgfmt.format('SOURCE', len(txt)))
        txt = do(txt, nmmap)
        with open('../{lab}/inkind.min.{lab}'.format(lab=lab.lower()), 'w') as f: f.write(txt)
        msg(msgfmt.format('RESULT', len(txt)))

main()
