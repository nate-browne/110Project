from typing import Optional
from flask_sqlalchemy import SQLAlchemy

from config import app

db = SQLAlchemy(app)
db.init_app(app)


class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    rental1 = db.Column(db.Integer, db.ForeignKey('Rental.id'), nullable=True)
    rental2 = db.Column(db.Integer, db.ForeignKey('Rental.id'), nullable=True)

    def __repr__(self) -> str:
        return '<User>\nName: {} {}\nEmail: {}\nRental ID: {}'.format(
            self.firstName, self.last_name, self.email, self.rental)


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


class Lease(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    landlordFirstName = db.Column(db.String(255), nullable=False)
    landlordLastName = db.Column(db.String(255), nullable=False)
    landlordPhoneNumber = db.Column(db.String(10), nullable=False)
    landlordEmail = db.Column(db.String(255), nullable=False)
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
                          nullable=False)
    contactInfoList = db.Column(db.Integer,
                                db.ForeignKey('ContactInfoList.id'),
                                nullable=False)
    lease = db.Column(db.Integer, db.ForeignKey('Lease.id'),
                      nullable=False)
    insurance = db.Column(db.Integer, db.ForeignKey('PropertyDocument.id'),
                          nullable=False)
    board = db.Column(db.Integer, db.ForeignKey('Board.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    photo = db.Column(db.String(255), nullable=True)

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
    phoneNumber = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    associatedUser = db.Column(db.Integer, db.ForeignKey('Users.id'),
                               nullable=False)

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


def getRentalByRentalID(rentalID: db.Integer) -> Optional[Rental]:
    '''Returns a rental from the db by finding the matching rentalID'''
    return Rental.query.filter_by(id=rentalID).first()


def getUserByEmail(email: str) -> Optional[Users]:
    return Users.query.filter_by(email=email).first()


def getUserById(user_id: db.Integer) -> Optional[Users]:
    return Users.query.filter_by(id=user_id).first()


def isUser(user) -> bool:
    '''Checks if a user has created an account already'''
    u = Users.query.filter_by(email=user.email).first()
    return u is not None


def addUser(user: Users) -> None:
    db.session.add(user)
    db.session.commit()


def updatePassword(user: Users, password: str) -> None:
    user.password = password
    db.session.commit()
