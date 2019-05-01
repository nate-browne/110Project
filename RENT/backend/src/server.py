from passlib.hash import sha256_crypt
from flask import Flask, request, abort, jsonify, url_for, make_response

from db_modules import db
from db_modules.db_objects.users import Users
from db_modules.db_objects.rental import Rental
from db_modules.db_objects.roommates import Roommates
from db_modules.db_objects.contact_info import ContactInfo
from db_modules.db_objects.expenses import ExpenseListItem, Expenses
from db_modules.db_objects.property_document import PropertyDocument
from db_modules.db_objects.grocery_list import GroceryList, GroceryListItem

app = Flask(__name__)
app.secret_key = 'aabjeetGx2LaCC1a4opBUsc95a6KmbKX20hHIq8ie5r8FJx5S9fSTk2hYsz85BLfNxk9vjw'
app.config['SQLALCHEMY_DATABASE_URI'] = db.DB_URL

database = db.DB(app)

@app.route('/')
def hello() -> str:
  return "hello"

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0')
