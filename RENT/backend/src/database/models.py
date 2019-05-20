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


class PropertyDocument(db.Model):
    __tablename__ = 'PropertyDocument'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    document = db.Column(db.LargeBinary(16777215), nullable=False)
    docName = db.Column(db.String(255), nullable=False)

    def __repr__(self) -> str:
        return '<Property Document>\nID: {}'.format(self.id)


class Lease(db.Model):
    __tablename__ = 'Lease'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    landlordFirstName = db.Column(db.String(255), nullable=False)
    landlordLastName = db.Column(db.String(255), nullable=False)
    landlordPhoneNumber = db.Column(db.String(25), nullable=False,
                                    default=None)
    landlordEmail = db.Column(db.String(255), nullable=False, default=None)
    rentCost = db.Column(db.DECIMAL(13, 2), nullable=False, default=0)
    startDate = db.Column(db.Date, nullable=False)
    endDate = db.Column(db.Date, nullable=False)
    rentDueDate = db.Column(db.String(50), nullable=False)
    document = db.Column(db.Integer, db.ForeignKey('PropertyDocument.id'),
                         nullable=False)


class Rental(db.Model):
    __tablename__ = 'Rental'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    roommates = db.Column(db.Integer, db.ForeignKey('Roommates.id'),
                          nullable=True, default=None)
    contactInfoList = db.Column(db.Integer,
                                db.ForeignKey('ContactInfoList.id'),
                                nullable=True, default=None)
    lease = db.Column(db.Integer, db.ForeignKey('Lease.id'),
                      nullable=True, default=None)
    insurance = db.Column(db.Integer, db.ForeignKey('PropertyDocument.id'),
                          nullable=True, default=None)
    board = db.Column(db.Integer, db.ForeignKey('Board.id'), nullable=True,
                      default=None)
    address = db.Column(db.String(255), nullable=True, default=None)

    def __repr__(self) -> str:
        print_str = "<Rental>\nrentalID: {}\ndocumentID: {}\nroommatesListID:\
            {}\ncontactInfoListID: {}\nexpensesID: {}\nshoppingListID: {}"
        return print_str.format(self.id, self.roommates, self.contact_info,
                                self.expenses, self.shopping_list)


class Board(db.Model):
    __tablename__ = 'Board'
    id = db.Column(db.Integer, primary_key=True, nullable=False)


class Note(db.Model):
    __tablename__ = 'Note'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    value = db.Column(db.String(500), nullable=False)
    board = db.Column(db.Integer, db.ForeignKey('Board.id'), nullable=False)
    isDeleted = db.Column(db.Boolean, nullable=False, default=False)


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


class ContactInfoList(db.Model):
    __tablename__ = 'ContactInfoList'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    contact1 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact2 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact3 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact4 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact5 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact6 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact7 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact8 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact9 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                         nullable=True)
    contact10 = db.Column(db.Integer, db.ForeignKey('ContactInfo.id'),
                          nullable=True)
