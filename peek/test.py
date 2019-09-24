class Test(object):
  def __init__(self):
    self.a = 'a'
    self.b = 'b'

  def a(self):
    print(self.a)

  def b(self):
    print(self.b)


c = Test()
method = 'a'
c.method()
method = 'b'
c.method()
