class Rental(object):
  '''This class represents a rental object in the database'''
  def __init__(self, document: int, roommates: int, contact_info: int, expenses: int, shopping_list: int) -> None:
    self.document = document
    self.roommates = roommates
    self.contact_info = contact_info
    self.expenses = expenses
    self.shopping_list = shopping_list