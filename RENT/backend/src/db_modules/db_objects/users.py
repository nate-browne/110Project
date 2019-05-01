class Users(object):
  '''Represents a User instance in the database.'''
  def __init__(self, email: str, first_name: str, last_name: str, password: str, rental: int) -> None:
    self.email = email
    self.first_name = first_name
    self.last_name = last_name
    self.password = password
    self.rental = rental