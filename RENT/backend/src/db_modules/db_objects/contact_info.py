class ContactInfo(object):
  '''This class represents a ContactInfo object in the database'''
  def __init__(self, first_name: str, last_name: str, phone_number: str, email: str, associated_user: str) -> None:
    self.first_name = first_name
    self.last_name = last_name
    self.phone_number = phone_number
    self.email = email
    self.associated_user = associated_user