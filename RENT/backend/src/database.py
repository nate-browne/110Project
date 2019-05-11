from typing import Optional, List
from flask_sqlalchemy import SQLAlchemy

from server import app

db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    rental = db.Column(db.Integer, db.ForeignKey('Rental.id'), nullable=True)

    def __repr__(self) -> str:
        return '<User>\nName: {} {}\nEmail: {}\nRental ID: {}'.format(
            self.first_name, self.last_name, self.email, self.rental)


class Roommate(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    roommate1 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                          default=None)
    roommate2 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                          default=None)
    roommate3 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                          default=None)
    roommate4 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                          default=None)
    roommate5 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                          default=None)

    def __repr__(self) -> str:
        to_print = []
        for attr in dir(self):
            if attr != id and attr is not None:
                to_print.append(attr)
                to_print.append("\n")
        val = []
        val.append("<Roommate List>\n")
        val.extend(to_print)
        return ''.join(val)


class PropertyDocument(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    document = db.Column(db.LargeBinary(16777215), nullable=False)
    docName = db.Column(db.String(255), nullable=False)

    def __repr__(self) -> str:
        return '<Property Document>\nID: {}'.format(self.id)


class ContactInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    associated_user = db.Column(db.Integer, db.ForeignKey('Users.id'),
                                nullable=False)

    def __repr__(self) -> str:
        return '<Contact Info>\nName: {} {}\nPhone Number: {}\
            \nAssociated User ID: {}'.format(
                self.first_name, self.last_name, self.phone_number,
                self.associated_user)


class GroceryListItem(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    count = db.Column(db.Integer, nullable=False, default=0)
    price = db.Column(db.Decimal(precision=13, scale=2))

    def __repr__(self) -> str:
        return '<Grocery List Item>\nName: {}\nCount: {}\nPrice: {}'.format(
            self.name, self.count, self.price)


class GroceryList(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    list_item1 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item2 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item3 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item4 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item5 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item6 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item7 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)
    list_item8 = db.Column(db.Integer, db.ForeignKey('GroceryListItem.id'),
                           default=None)

    def __repr__(self) -> str:
        to_print = []
        for attr in dir(self):
            if attr != id and attr is not None:
                to_print.append(attr)
                to_print.append("\n")
        val = []
        val.append("<Grocery List>\n")
        val.extend(to_print)
        return ''.join(val)


class Rental(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    document = db.Column(db.Integer, db.ForeignKey('PropertyDocument.id'),
                         nullable=False)
    roommates = db.Column(db.Integer, db.ForeignKey('Roommates.id'),
                          nullable=False)
    contact_info = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                             nullable=False)
    expenses = db.Column(db.Integer, db.ForeignKey('Expenses.id'),
                         nullable=False)
    shopping_list = db.Column(db.Integer, db.ForeignKey('GroceryList.id'),
                              nullable=True, default=None)

    def __repr__(self) -> str:
        print_str = "<Rental>\nrentalID: {}\ndocumentID: {}\nroommatesListID:\
            {}\ncontactInfoListID: {}\nexpensesID: {}\nshoppingListID: {}"
        return print_str.format(self.id, self.roommates, self.contact_info,
                                self.expenses, self.shopping_list)


class ExpensesListItem(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    expense = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Decimal(precision=13, scale=2), nullable=False,
                     default=0)
    paid = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self) -> str:
        print_str = "<ExpenseListItem>\nid: {}\nexpense name: {}\ncost:\
            {}\npaid: {}"
        return print_str.format(self.id, self.expense, self.cost, self.paid)


class Expenses(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    rent = db.Column(db.Integer, db.ForeignKey('ExpenseListItem.id'),
                     nullable=False)
    heat_gas = db.Column(db.Integer, db.ForeignKey('ExpenseListItem.id'),
                         default=None)
    internet = db.Column(db.Integer, db.ForeignKey('ExpenseListItem.id'),
                         default=None)
    electricity = db.Column(db.Integer, db.ForeignKey('ExpenseListItem.id'),
                            default=None)
    insurance = db.Column(db.Integer, db.ForeignKey('ExpenseListItem.id'),
                          default=None)


def getRentalByRentalID(rentalID: db.Integer) -> Optional[Rental]:
    '''Returns a rental from the db by finding the matching rentalID'''
    return Rental.query.filter_by(id=rentalID).first()


def getUserByLogin(user: List[str, str]) -> Optional[Users]:
    '''Returns the matching user from the DB given the email and password, or
    "None" if they do not exist'''
    return Users.query.filter_by(email=user[0], password=user[1]).first()


def isUser(user) -> bool:
    pass
