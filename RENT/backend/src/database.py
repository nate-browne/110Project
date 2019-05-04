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
        return '<User>\nname: {} {}\nemail: {}\nrentalID: {}'.format(
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
        val.append("<RoommateList>\n")
        val.extend(to_print)
        return ''.join(val)


def getUserByObject(user: Users) -> Optional[Users]:
    pass
