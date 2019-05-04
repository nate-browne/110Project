from typing import Optional
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
    roomate1 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                         default=None)
    roomate2 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                         default=None)
    roomate3 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                         default=None)
    roomate4 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
                         default=None)
    roomate5 = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=True,
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


def getUserByObject(user: Users) -> Optional[Users]:
    pass
