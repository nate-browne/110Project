from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy

from config import app

db = SQLAlchemy(app)
db.init_app(app)


class Users(UserMixin, db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phoneNumber = db.Column(db.String(25), nullable=True)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    currentRental = db.Column(db.Integer, db.ForeignKey('Rental.id'),
                              nullable=True)
    pastRental = db.Column(db.Integer, db.ForeignKey('Rental.id'),
                           nullable=True)
    deactivated = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self) -> str:
        return '<User>\nName: {} {}\nEmail: {}\nRental ID: {}'.format(
            self.firstName, self.last_name, self.email, self.rental)


class Roommates(db.Model):
    __tablename__ = 'Roommates'
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


class Lease(db.Model):
    __tablename__ = 'Lease'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    landlordFirstName = db.Column(db.String(255), nullable=False)
    landlordLastName = db.Column(db.String(255), nullable=False)
    landlordPhoneNumber = db.Column(db.String(25), nullable=False,
                                    default=None)
    landlordEmail = db.Column(db.String(255), nullable=False, default=None)
    rentCost = db.Column(db.DECIMAL(13, 2), nullable=False, default=0)
    startDT = db.Column(db.DateTime, nullable=False)
    endDT = db.Column(db.DateTime, nullable=False)
    rentDueDate = db.Column(db.String(50), nullable=False)


class Rental(db.Model):
    __tablename__ = 'Rental'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    roommates = db.Column(db.Integer, db.ForeignKey('Roommates.id'),
                          nullable=False)
    lease = db.Column(db.Integer, db.ForeignKey('Lease.id'),
                      nullable=True, default=None)
    board = db.Column(db.Integer, db.ForeignKey('Board.id'), nullable=True,
                      default=None)
    address = db.Column(db.String(255), nullable=False)

    def __repr__(self) -> str:
        print_str = "<Rental>\nrentalID: {}\nroommatesListID:\
            {}\nexpensesID: {}\nshoppingListID: {}"
        return print_str.format(self.id, self.roommates, self.expenses,
                                self.shopping_list)


class Board(db.Model):
    __tablename__ = 'Board'
    id = db.Column(db.Integer, primary_key=True, nullable=False)


class Note(db.Model):
    __tablename__ = 'Note'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    board = db.Column(db.Integer, db.ForeignKey('Board.id'), nullable=False)
    isDeleted = db.Column(db.Boolean, nullable=False, default=False)
    category = db.Column(db.String(25), nullable=False)


class ContactInfo(db.Model):
    __tablename__ = 'ContactInfo'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    phoneNumber = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    associatedUser = db.Column(db.Integer, db.ForeignKey('Users.id'),
                               nullable=False)
    relationship = db.Column(db.String(255), nullable=False)

    def __repr__(self) -> str:
        return '<Contact Info>\nName: {} {}\nPhone Number: {}\
            \nAssociated User ID: {}'.format(
                self.firstName, self.last_name, self.phone_number,
                self.associated_user)


class CalendarEvent(db.Model):
    __tablename__ = 'CalendarEvent'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    eventName = db.Column(db.String(255), nullable=False)
    eventStartDT = db.Column(db.DateTime, nullable=False)
    eventEndDT = db.Column(db.DateTime, nullable=False)
    eventDescription = db.Column(db.String(255), default=None)
    rental = db.Column(db.Integer, db.ForeignKey('Rental.id'), nullable=False)
    isDeleted = db.Column(db.Boolean, nullable=False, default=False)
