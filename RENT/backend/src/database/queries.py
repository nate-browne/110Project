from typing import Optional, List, Any

from .models import Rental, Lease, PropertyDocument, db, Users, ContactInfo
from .models import Roommates, CalendarEvent, Note


def getRentalByRentalID(rentalID: db.Integer) -> Optional[Rental]:
    '''Returns a rental from the db by finding the matching rentalID'''
    return Rental.query.filter_by(id=rentalID).first()


def getLeaseByLeaseID(leaseID: db.Integer) -> Optional[Lease]:
    '''Returns a lease from the db by finding the matching leaseID'''
    return Lease.query.filter_by(id=leaseID).first()


def getDocByDocID(documentID: db.Integer) -> Optional[PropertyDocument]:
    '''Returns a document from the db by finding the matching documentID'''
    return PropertyDocument.query.filter_by(id=documentID).first()


def getUserByEmail(email: str) -> Optional[Users]:
    return Users.query.filter_by(email=email).first()


def getUserById(user_id: db.Integer) -> Optional[Users]:
    return Users.query.filter_by(id=user_id).first()


def isUser(user: Users) -> bool:
    '''Checks if a user has created an account already'''
    u = Users.query.filter_by(email=user.email).first()
    return u is not None


def getContactWithAssocUser(userID: db.Integer) -> List[ContactInfo]:
    return ContactInfo.query.filter_by(associatedUser=userID).all()


def getEventsWithRental(rentalID: db.Integer) -> List[CalendarEvent]:
    return CalendarEvent.query.filter_by(rental=rentalID).all()


def getRoommatesByID(matesID: db.Integer, userID: db.Integer) -> List[Users]:
    u_org = Roommates.query.filter_by(id=matesID).first()
    u = list(filter(lambda x: x.startswith('room'), dir(u_org)))
    u = list(filter(lambda i: int(getattr(u_org, i)) != userID), u)
    return list(map(lambda i: getUserById(int(i)), u))


def addUser(user: Users) -> None:
    db.session.add(user)
    db.session.commit()


def updateUserInfo(user: Users, attribute: str, obj: Any) -> None:
    setattr(user, attribute, obj)
    db.session.commit()


def updateUserRentals(user: Users, rentalID: db.Integer) -> None:
    user.pastRental = user.currentRental
    user.currentRental = rentalID
    db.session.commit()


def addRental(rental: Rental) -> None:
    db.session.add(rental)
    db.session.commit()


def addNote(note: Note) -> None:
    db.session.add(note)
    db.session.commit()


def getNotesByBoardID(boardID: db.Integer) -> List[Note]:
    n = Note.query.filter_by(board=boardID).all()
    return list(filter(lambda n: not n.isDeleted, n))


def getRentalRoommates(roommatesID: db.Integer) -> Optional[Roommates]:
    return Roommates.query.filter_by(id=roommatesID).first()


def addRoommatesRow(roommates: Roommates) -> None:
    db.session.add(roommates)
    db.session.commit()


def getNoteByNoteID(noteID: db.Integer) -> Optional[Note]:
    return Note.query.filter_by(id=noteID).first()


def updateRoommate(roommate: Roommates, ent: str, userID: db.Integer) -> None:
    setattr(roommate, ent, userID)
    db.session.commit()
