from controllers.html import bencode, bdecode


test = ['"<she"banq>"', 'aap']
print(test)

testb = bencode(test)
print(testb)

testbb = bdecode(testb)
print(testbb)
