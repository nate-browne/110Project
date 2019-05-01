class PropertyDocument(object):
  '''This class represents a PropertyDocument object in the database'''
  def __init__(self, document, doc_name: str) -> None:
    self.document = document
    self.docName = doc_name