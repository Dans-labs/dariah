class Workflow(object):
  def __init__(self, workflowRecord):
    for (k, v) in workflowRecord.items():
      setattr(self, k, v)
