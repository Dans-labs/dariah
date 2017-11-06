import smtplib

fromaddr = 'dariah@dans.knaw.nl'
toaddrs  = ['dirk.roorda@dans.knaw.nl']

msg = 'From: {}\r\nTo: {}\r\n\r\n'.format(fromaddr, ','.join(toaddrs))

msg += 'Test\r\n'
msg += 'https://shebanq.ancient-data.org \r\n'

server = smtplib.SMTP('localhost')
server.set_debuglevel(1)
server.sendmail(fromaddr, toaddrs, msg)
server.quit()
