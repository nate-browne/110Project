from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from db_objects.users import Users
from db_objects.rental import Rental
from db_objects.roommates import Roommates
from db_objects.contact_info import ContactInfo
from db_objects.expenses import ExpenseListItem, Expenses
from db_objects.property_document import PropertyDocument
from db_objects.grocery_list import GroceryList, GroceryListItem

# Local database URL for everyone
DB_URL = 'mysql://root@localhost/rent'

class DB(object):
  '''Abstraction of the database as a class for ease of use.\n
  Makes queries, retrives objects, sends it back to the server
  for the server to act as a RESTful API endpoint for the frontend.'''

  def __init__(self, app: Flask) -> None:
    '''Constructor. Initializes a SQLAlchemy object using the passed-in
    Flask app.\n
    :params: app - Flask app to initialize the DB with
    '''
    self.sql = SQLAlchemy(app)
