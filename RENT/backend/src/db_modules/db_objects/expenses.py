class ExpenseListItem(object):
  '''This class represents an ExpenseListItem object in the database'''
  def __init__(self, expense: str, cost: float, paid: bool) -> None:
    self.expense = expense
    self.cost = cost
    self.paid = paid

class Expenses(object):
  '''This class represents an Expense object in the database'''
  def __init__(self, rent: int, heat_gas: int, internet: int, electricity: int, insurance: int) -> None:
    self.rent = rent
    self.heat_gas = heat_gas
    self.internet = internet
    self.electricity = electricity
    self.insurance = insurance