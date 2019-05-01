from sqlalchemy.orm import mapper
from sqlalchemy import Table, MetaData, Column, ForeignKey
from sqlalchemy.dialects.mysql import BIGINT, VARCHAR, DECIMAL, TINYINT, INTEGER, MEDIUMBLOB

from expenses import *
from users import Users
from rental import Rental
from grocery_list import *
from roommates import Roommates
from contact_info import ContactInfo
from property_document import PropertyDocument

metadata = MetaData()

users = Table('Users', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('email', VARCHAR(255), nullable=False, unique=True),
  Column('firstName', VARCHAR(255), nullable=False),
  Column('lastName', VARCHAR(255), nullable=False),
  Column('password', VARCHAR(255), nullable=False),
  Column('rental', BIGINT(20), ForeignKey('Rental.id'), nullable=True, default=None),
)
mapper(Users, users)

roommates = Table('Roommates', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('roommate1', BIGINT(20), ForeignKey('Users.id'), nullable=True, default=None),
  Column('roommate2', BIGINT(20), ForeignKey('Users.id'), nullable=True, default=None),
  Column('roommate3', BIGINT(20), ForeignKey('Users.id'), nullable=True, default=None),
  Column('roommate4', BIGINT(20), ForeignKey('Users.id'), nullable=True, default=None),
  Column('roommate5', BIGINT(20), ForeignKey('Users.id'), nullable=True, default=None)
)
mapper(Roommates, roommates)

property_document = Table('PropertyDocument', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('document', MEDIUMBLOB(16777215), nullable=False),
  Column('docName', VARCHAR(255), nullable=False)
)
mapper(PropertyDocument, property_document)

rental = Table('Rental', metadata,
  Column('id', BIGINT(20), nullable=False, primary_key=True),
  Column('document', BIGINT(20), ForeignKey('PropertyDocument.id'), nullable=False),
  Column('roommates', BIGINT(20), ForeignKey('Roommates.id'), nullable=False),
  Column('contactInfo', BIGINT(20), ForeignKey('ContactInfo.id'), nullable=False),
  Column('expenses', BIGINT(20), ForeignKey('Expenses.id'), nullable=False),
  Column('shoppingList', BIGINT(20), ForeignKey('GroceryList.id'), nullable=False),
)
mapper(Rental, rental)

contact_info = Table('ContactInfo', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('firstName', VARCHAR(255), nullable=False),
  Column('lastName', VARCHAR(255), nullable=False),
  Column('phoneNumber', VARCHAR(10), nullable=False),
  Column('email', VARCHAR(255), nullable=True),
  Column('associatedUser', BIGINT(20), ForeignKey('Users.id'), nullable=False)
)
mapper(ContactInfo, contact_info)

grocery_list_item = Table('GroceryListItem', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('name', VARCHAR(25), nullable=False),
  Column('count', INTEGER(4), nullable=False, default=0),
  Column('price', DECIMAL(precision=13, scale=2))
)
mapper(GroceryListItem, grocery_list_item)

grocery_list = Table('GroceryList', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('listItem1', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem2', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem3', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem4', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem5', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem6', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem7', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None),
  Column('listItem8', BIGINT(20), ForeignKey('GroceryListItem.id'), default=None)
)
mapper(GroceryList, grocery_list)

expenses = Table('Expenses', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('rent', BIGINT(20), ForeignKey('ExpenseListItem.id'), nullable=False),
  Column('heat_gas', BIGINT(20), ForeignKey('ExpenseListItem.id'), default=None),
  Column('internet', BIGINT(20), ForeignKey('ExpenseListItem.id'), default=None),
  Column('electricity', BIGINT(20), ForeignKey('ExpenseListItem.id'), default=None),
  Column('insurance', BIGINT(20), ForeignKey('ExpenseListItem.id'), default=None)
)
mapper(Expenses, expenses)

expense_list_item = Table('ExpenseListItem', metadata,
  Column('id', BIGINT(20), primary_key=True, nullable=False),
  Column('expense', VARCHAR(255), nullable=False),
  Column('cost', DECIMAL(precision=15, scale=2), nullable=False, default=0),
  Column('paid', TINYINT(1), nullable=False, default=0)
)
mapper(ExpenseListItem, expense_list_item)