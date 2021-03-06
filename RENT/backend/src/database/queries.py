from typing import Optional, List, Any, Union

from .models import Rental, Lease, db, Users, ContactInfo, Roommates, Note
from .models import CalendarEvent

ModelTypes = Union[
                    Rental, Lease, Users, ContactInfo,
                    Roommates, CalendarEvent, Note
                  ]


def getRentalByRentalID(rentalID: db.Integer) -> Optional[Rental]:
    '''Returns a rental from the db by finding the matching rentalID'''
    return Rental.query.filter_by(id=rentalID).first()


def getLeaseByLeaseID(leaseID: db.Integer) -> Optional[Lease]:
    '''Returns a lease from the db by finding the matching leaseID'''
    return Lease.query.filter_by(id=leaseID).first()


def getUserByEmail(email: str) -> Optional[Users]:
    return Users.query.filter_by(email=email).first()


def getUserById(user_id: db.Integer) -> Optional[Users]:
    return Users.query.filter_by(id=user_id).first()


def getContactsWithAssocUser(userID: db.Integer) -> List[ContactInfo]:
    return ContactInfo.query.filter_by(associatedUser=userID).all()


def getContactWithContactID(contactID: db.Integer) -> Optional[ContactInfo]:
    return ContactInfo.query.filter_by(id=contactID).first()


def getEventsWithRental(rentalID: db.Integer) -> List[CalendarEvent]:
    n = CalendarEvent.query.filter_by(rental=rentalID).all()
    return list(filter(lambda n: not n.isDeleted, n))


def getRoommatesByID(matesID: db.Integer, userID: db.Integer) -> List[Users]:
    u_org = Roommates.query.filter_by(id=matesID).first()
    att = list(filter(lambda x: x.startswith('room'), dir(u_org)))
    new_u = {}
    ret = list()
    for a in att:
        attr = getattr(u_org, a)
        if attr is not None:
            new_u[a] = attr
    for val in new_u.values():
        ret.append(getUserById(int(val)))
    return ret


def getNotesByBoardID(boardID: db.Integer) -> List[Note]:
    n = Note.query.filter_by(board=boardID).all()
    return list(filter(lambda n: not n.isDeleted, n))


def getRentalRoommates(roommatesID: db.Integer) -> Optional[Roommates]:
    return Roommates.query.filter_by(id=roommatesID).first()


def getNoteByNoteID(noteID: db.Integer) -> Optional[Note]:
    return Note.query.filter_by(id=noteID).first()


def getEventByEventID(eventID: db.Integer) -> Optional[CalendarEvent]:
    return CalendarEvent.query.filter_by(id=eventID).first()


def isUser(user: Users) -> bool:
    '''Checks if a user has created an account already'''
    u = Users.query.filter_by(email=user.email).first()
    return u is not None


def update(table: ModelTypes, attribute: str, obj: Any) -> None:
    setattr(table, attribute, obj)
    db.session.commit()


def updateUserRentals(user: Users, rentalID: db.Integer) -> None:
    user.pastRental = user.currentRental
    user.currentRental = rentalID
    db.session.commit()


def add(table: ModelTypes) -> None:
    db.session.add(table)
    db.session.commit()
