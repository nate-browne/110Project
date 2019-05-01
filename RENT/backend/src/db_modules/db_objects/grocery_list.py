class GroceryListItem(object):
  '''This class represents a GroceryListItem in the database'''
  def __init__(self, name: str, count: int, price: float) -> None:
    self.name = name
    self.count = count
    self.price = price

class GroceryList(object):
  '''This class represents a GroceryList in the database'''
  def __init__(self, list_item1: int, list_item2: int, list_item3: int, list_item4: int, list_item5: int,
    list_item6: int, list_item7: int, list_item8: int) -> None:
    self.list_item1 = list_item1
    self.list_item2 = list_item2
    self.list_item3 = list_item3
    self.list_item4 = list_item4
    self.list_item5 = list_item5
    self.list_item6 = list_item6
    self.list_item7 = list_item7
    self.list_item8 = list_item8