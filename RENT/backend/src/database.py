from typing import Optional, List
from flask_sqlalchemy import SQLAlchemy

from config import app

db = SQLAlchemy(app)
db.init_app(app)


class Users(db.Model):
    __tablename__ = 'Users'
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
    __tablename__ = 'Roommate'
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
    __tablename__ = 'PropertyDocument'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    document = db.Column(db.LargeBinary(16777215), nullable=False)
    docName = db.Column(db.String(255), nullable=False)

    def __repr__(self) -> str:
        return '<Property Document>\nID: {}'.format(self.id)


class ContactInfo(db.Model):
    __tablename__ = 'ContactInfo'
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


class Rental(db.Model):
    __tablename__ = 'Rental'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    document = db.Column(db.Integer, db.ForeignKey('PropertyDocument.id'),
                         nullable=False)
    roommates = db.Column(db.Integer, db.ForeignKey('Roommates.id'),
                          nullable=False)
    contact_info = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                             nullable=False)
    shopping_list = db.Column(db.Integer, db.ForeignKey('GroceryList.id'),
                              nullable=True, default=None)
    address = db.Column(db.String(255), nullable=False)
    rent_cost = db.Column(db.DECIMAL(precision=13, scale=2), nullable=False,
                          default=0)
    photo = db.Column(db.String(255), nullable=True)

    def __repr__(self) -> str:
        print_str = "<Rental>\nrentalID: {}\ndocumentID: {}\nroommatesListID:\
            {}\ncontactInfoListID: {}\nexpensesID: {}\nshoppingListID: {}"
        return print_str.format(self.id, self.roommates, self.contact_info,
                                self.expenses, self.shopping_list)


def getRentalByRentalID(rentalID: db.Integer) -> Optional[Rental]:
    '''Returns a rental from the db by finding the matching rentalID'''
    return Rental.query.filter_by(id=rentalID).first()


def getUserByLogin(user: List[str]) -> Optional[Users]:
    '''Returns the matching user from the DB given the email and password, or
    "None" if they do not exist'''
    return Users.query.filter_by(email=user[0], password=user[1]).first()


def isUser(user) -> bool:
    '''Checks if a user has created an account already'''
    u = Users.query.filter_by(email=user.email, password=user.password).first()
    return u is None


def addUser(user: Users) -> None:
    db.session.add(user)
    db.session.commit()
