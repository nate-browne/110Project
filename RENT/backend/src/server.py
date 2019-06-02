from datetime import datetime as d
from flask import request, jsonify
from passlib.hash import pbkdf2_sha256
from flask_login import login_user, login_required, logout_user

from utils import mailer
from config import app, _login
from utils.files import upload_file

import database.queries as dq
from database.models import PropertyDocument, Note, CalendarEvent, ContactInfo
from database.models import Users, Rental, Roommates, Board, Lease, LeaseImages


@app.route('/createuser', methods=['POST'])
def create_user():
    '''This route is used to create a new user in the database.\n
    It can only be reached via POST. To update a user's data, use
    the route '/updateuser'.\n
    The route expects that the data comes in with the following fields:\n
    item - JSON tag - description\n
    email - 'email' - The user's email\n
    first name - 'firstName' - the user's first name\n
    surname - 'lastName' - the user's surname\n
    phoneNumber - 'phoneNumber' - the user's phoneNumber\n
    password - 'password' - the user's password\n

    If the user already exists in the database, it will return an empty JSON
    object and status code 301 to signify this. If the user is
    successfully added, it will return an empty JSON object and status
    code 201.
    '''

    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    phoneNumber = request.json['phoneNumber']
    password = pbkdf2_sha256.hash(request.json['password'])
    user = Users(email=email, firstName=firstName, lastName=lastName,
                 phoneNumber=phoneNumber, password=password)

    # check if user exists and redirect them if they do
    if dq.isUser(user):
        return jsonify({}), 301
    else:
        # create user in the DB and return success
        dq.add(user)
        return jsonify({}), 201


@app.route('/addroommate', methods=['POST'])
@login_required
def add_roommate():
    '''This route is used to add a roommate to a given rental\n
    It can only be reached via POST request.\n
    The route expects that the data comes in with the following fields:\n
    item - JSON tag - description\n
    rentalID - 'rentalID' - ID of the rental to add the roommate to\n
    email - 'email' - email of the roommmate to add
    '''

    rentalID = request.json['rentalID']
    email = request.json['email']
    user = dq.getUserByEmail(email)
    if user is None:
        return jsonify({'reason': "User doesn't exist"}), 404

    if user.deactivated:
        return jsonify({'reason': "User is deactivated"}), 400

    rental = dq.getRentalByRentalID(rentalID)
    if rental is None:
        return jsonify({'reason': "Rental does not exist"}), 404

    roommates = dq.getRentalRoommates(rental.roommates)

    if roommates is not None:
        # Filter out the roommate attributes from the field
        mates = list(filter(lambda x: x.startswith('room'), dir(roommates)))
        for ent in mates:
            if getattr(roommates, ent) is None:
                dq.update(roommates, ent, user.id)
                dq.updateUserRentals(user, rentalID)
                return jsonify({}), 201
            elif getattr(roommates, ent) == user.id:
                return jsonify({'reason': "Roommate already entered"}), 400
        return jsonify({'reason': "Adding 6th Roommate is not allowed"}), 400
    else:
        err = "Roommates table somehow doesn't exist???"
        return jsonify({'reason': err}), 404


@app.route('/deleteroommate', methods=['POST'])
@login_required
def delete_roommate():
    rentalID = request.json['rentalID']
    email = request.json['email']
    user = dq.getUserByEmail(email)
    if user.deactivated:
        return jsonify({'reason': "User is deactivated"}), 400

    roommatesID = dq.getRentalByRentalID(rentalID).roommates
    roommates = dq.getRentalRoommates(roommatesID)
    mates = list(filter(lambda x: x.startswith('room'), dir(roommates)))
    for ent in mates:
        if user.id == getattr(roommates, ent):
            dq.updateUserRentals(user, None)
            dq.update(roommates, ent, None)
            return jsonify({}), 201
    return jsonify({'reason': "Roommate isn't a roommate"}), 404


@app.route('/deactivate', methods=['POST'])
@login_required
def deactivate():
    email = request.json['email']
    user = dq.getUserByEmail(email)
    dq.update(user, 'deactivated', True)
    logout_user()
    return jsonify({}), 201


@app.route('/changeuserinfo', methods=['POST'])
@login_required
def change_user_info():
    email = request.json['email']
    user = dq.getUserByEmail(email)

    if request.files['profilePhoto']:
        path = upload_file(request.files['profilePhoto'], "users")
        dq.update(user, 'profilePhoto', path)

    for att in list(filter(lambda x: not x.startswith("__"), dir(user))):
        if att != 'id' and request.json[att] is not None:
            if att != 'email':
                dq.update(user, att, request.json[att])
            elif att == 'email':
                change = request.json['change']
                ch = dq.getUserByEmail(change)
                if ch is not None:
                    return jsonify({'reason': "Email in use"}), 404
                dq.update(user, 'email', change)

    return jsonify({}), 201


@app.route('/changeleaseinfo', methods=['POST'])
@login_required
def change_lease_info():
    leaseID = request.json['leaseID']
    lease = dq.getLeaseByLeaseID(leaseID)
    if lease is None:
        return jsonify({'reason': 'Lease does not Exist'}), 404

    for att in list(filter(lambda x: not x.startswith("__"), dir(lease))):
        if att != 'id' and request.json[att] is not None:
            dq.update(lease, att, request.json[att])

    return jsonify({}), 201


@app.route('/changenoteinfo', methods=['POST'])
@login_required
def change_note_info():
    noteID = request.json['noteID']
    note = dq.getNoteByNoteID(noteID)
    if note is None:
        return jsonify({'reason': 'Note does not exist'}), 404
    for att in list(filter(lambda x: not x.startswith("__"), dir(note))):
        if att != 'id' and request.json[att] is not None:
            dq.update(note, att, request.json[att])

    return jsonify({}), 201


@app.route('/addcontactinfo', methods=['POST'])
@login_required
def add_contact_info():
    userID = request.json['userID']
    # of contact we're adding for user
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    phoneNumber = request.json['phoneNumber']
    email = request.json['email']  # can be empty, but must be in the request
    relationship = request.json['relationship']
    contact = ContactInfo(firstName=firstName, lastName=lastName,
                          phoneNumber=phoneNumber, email=email,
                          relationship=relationship,
                          associatedUser=userID)
    dq.add(contact)
    return jsonify({'contactID': contact.id}), 201


@app.route('/deletecontactinfo', methods=['POST'])
@login_required
def delete_contact_info():
    contactID = request.json['contactID']
    contact = dq.getContactWithContactID(contactID)
    if contact is None:
        return jsonify({'reason': 'Contact info does not exist'}), 404

    contact.associatedUser = None
    dq.update(ContactInfo, 'associatedUser', contact)
    return jsonify({'reason': 'Contact info updated!'}), 200


@app.route('/changecontactinfo', methods=['POST'])
@login_required
def change_contact_info():
    contactID = request.json['contactID']
    contact = dq.getContactWithContactID(contactID)
    if contact is None:
        return jsonify({'reason': 'Contact info does not exist'}), 404
    for att in list(filter(lambda x: not x.startswith("__"), dir(contact))):
        if (att != 'id' and att != 'associatedUser' and
           request.json[att] is not None):
            dq.update(contact, att, request.json[att])

    return jsonify({}), 201


@app.route('/changecalendarevent', methods=['POST'])
@login_required
def change_calendar_event():
    eventID = request.json['eventID']
    event = dq.getEventByEventID(eventID)
    if event is None:
        return jsonify({'reason': 'Calendar event does not exist'}), 404
    for att in list(filter(lambda x: not x.startswith("__"), dir(event))):
        if (att != 'id' and att != 'rental' and att != 'isDeleted' and
                request.json[att] is not None):
            dq.update(event, att, request.json[att])

    return jsonify({}), 201


@app.route('/addleasephotos', methods=['POST'])
@login_required
def add_lease_photos():
    leaseID = request.json['leaseID']
    path = upload_file(request.files['photo'], "lease")
    img = LeaseImages(url=path, associatedLease=leaseID)
    dq.add(img)
    return jsonify({}), 201


@app.route('/getleasephotos', methods=['GET'])
@login_required
def get_lease_photos():
    leaseID = request.args.get('leaseID')
    photoAlbum = dq.getPhotosByLeaseID(leaseID)
    photos = list()
    for photo in photoAlbum:
        photos.append(photo.url)
    return jsonify({'photos': photos}), 200


@app.route('/addlease', methods=['POST'])
@login_required
def add_lease():
    rentalID = request.json['rentalID']
    rental = dq.getRentalByRentalID(rentalID)
    landlordFirstName = request.json['landlordFirstName']
    landlordLastName = request.json['landlordLastName']
    landlordPhoneNumber = request.json['landlordPhoneNumber']
    landlordEmail = request.json['landlordEmail']
    rentCost = request.json['rentCost']
    if rentCost == "":
        rentCost = 0
    startDate = request.json['startDate']
    endDate = request.json['endDate']
    rentDueDate = request.json['rentDueDate']
    path = upload_file(request.files['document'], "doc")
    leaseDoc = PropertyDocument(url=path)
    dq.add(leaseDoc)

    lease = Lease(landlordFirstName=landlordFirstName,
                  landlordLastName=landlordLastName,
                  landlordPhoneNumber=landlordPhoneNumber,
                  landlordEmail=landlordEmail,
                  rentCost=rentCost, startDate=startDate, endDate=endDate,
                  rentDueDate=rentDueDate,
                  document=leaseDoc.id)
    dq.add(lease)
    dq.update(rental, 'lease', lease.id)
    return jsonify({}), 201


@app.route('/addinsurancedocument', methods=['POST'])
@login_required
def add_insurance_document():
    rentalID = request.json['rentalID']
    rental = dq.getRentalByRentalID(rentalID)
    path = upload_file(request.files['document'], "doc")
    insuranceDoc = PropertyDocument(url=path)
    dq.add(insuranceDoc)
    dq.update(rental, 'insurance', insuranceDoc.id)
    return jsonify({}), 201


@app.route('/getnotes', methods=['GET'])
@login_required
def get_notes():
    rentalID = request.args.get('rentalID')
    rental = dq.getRentalByRentalID(rentalID)
    notes = dq.getNotesByBoardID(rental.board)
    data = {}
    for note in notes:
        if note.category in data:
            data[note.category].append({'title': note.title,
                                        'noteID': note.id,
                                        'description': note.description})
        else:
            data[note.category] = list()
            data[note.category].append({'title': note.title,
                                        'noteID': note.id,
                                        'description': note.description})
    return jsonify({'notes': data}), 200


@app.route('/getcalendarevents', methods=['GET'])
@login_required
def get_calendar_events():
    rentalID = request.args.get('rentalID')
    events = dq.getEventsWithRental(rentalID)
    return jsonify({'events': events}), 200


@app.route('/addcalendarevent', methods=['POST'])
@login_required
def add_calendar_event():
    rentalID = request.json['rentalID']
    eventName = request.json['eventName']
    eventDate = request.json['eventDate']
    eventDescription = request.json['eventDescription']
    event = CalendarEvent(eventName=eventName, eventDate=eventDate,
                          eventDescription=eventDescription, rental=rentalID)
    dq.add(event)
    return jsonify({}), 201


@app.route('/deletecalendarevent', methods=['POST'])
@login_required
def delete_calendar_event():
    eventID = request.json['eventID']
    event = dq.getEventByEventID(eventID)
    if event is not None:
        dq.update(event, 'isDeleted', True)
        return jsonify({}), 201
    return jsonify({'reason': "Event does not exist"}), 404


@app.route('/addnote', methods=['POST'])
@login_required
def add_note():
    description = request.json['description']
    title = request.json['title']
    rentalID = request.json['rentalID']
    rental = dq.getRentalByRentalID(rentalID)
    board = rental.board
    category = request.json['category']
    note = Note(description=description, title=title, board=board,
                category=category)
    dq.add(note)
    return jsonify({}), 201


@app.route('/deletenote', methods=['POST'])
@login_required
def delete_note():
    noteID = request.json['noteID']
    note = dq.getNoteByNoteID(noteID)
    if note is not None:
        dq.update(note, 'isDeleted', True)
        return jsonify({}), 201
    return jsonify({'reason': "Note does not exist"}), 404


@app.route('/clearnotes', methods=['POST'])
@login_required
def clear_notes():
    notes = request.json['notes']
    for note in notes:
        n = dq.getNoteByNoteID(note)
        dq.update(n, 'isDeleted', True)
    return jsonify({}), 200


@app.route('/createrental', methods=['POST'])
@login_required
def create_rental():
    '''This route is used to create a new rental in the database.\n
    It can only be reached via POST. To update a rentals's data, use
    the route '/updaterental'.\n
    The route expects that the data comes in with the following fields:\n
    item - JSON tag - description\n
    address - 'address' - the address of the rental\n
    userID - 'userID' - the userID of the person who created the rental

    This function will always return an empty JSON object and status code 201
    '''
    # Pull fields from the request
    address = request.json['address']
    userID = request.json['userID']

    # grab the user and update their rental fields
    user = dq.getUserById(userID)

    # Create a rental and update the user's current rental
    roommates = Roommates(roommate1=userID)
    dq.add(roommates)
    board = Board()
    dq.add(board)
    rental = Rental(address=address, roommates=roommates.id,
                    board=board.id)
    dq.add(rental)
    dq.updateUserRentals(user, rental.id)
    data = {}
    data['currentRental'] = user.currentRental
    data['pastRental'] = user.pastRental

    return jsonify(data), 201


@app.route('/forgotpassword', methods=['POST'])
def forgot_password():
    print("we actually called the route!")
    user = dq.getUserByEmail(request.json['email'])
    if user is not None:
        temp = mailer.send_mail(user.email)
        _change_password(user, temp)
        return jsonify({}), 200
    else:
        return jsonify({'reason': "User not found"}), 404


@app.route('/resetpassword', methods=['POST'])
@login_required
def reset_password():
    email = request.json['email']
    password = request.json['password']
    user = dq.getUserByEmail(email)
    _change_password(user, password)
    return jsonify({}), 201


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({}), 200


@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    remember = True if request.json['remember'] == 'true' else False

    user = dq.getUserByEmail(email)

    if _validate(user, password):
        dq.update(user, 'deactivated', False)
        login_user(user, remember=remember)
        return jsonify({'userID': user.id, 'firstName': user.firstName}), 200
    else:
        return jsonify({'reason': "User/Password doesn't match"}), 400


@app.route('/getaddress', methods=['GET'])
@login_required
def get_address():
    rentalID = request.args.get('rentalID')
    print(type(rentalID))
    rental = dq.getRentalByRentalID(rentalID)
    if rental is not None:
        return jsonify({'address': rental.address}), 200
    else:
        return jsonify({'reason': "Rental not found"}), 404


@app.route('/getleaseenddate', methods=['GET'])
@login_required
def get_lease_end_date():
    rentalID = request.args.get('rentalID')
    rental = dq.getRentalByRentalID(rentalID)
    if rental is not None:
        lease = dq.getLeaseByLeaseID(rental.lease)
        if lease is not None:
            dt = lease.endDate
            daysTill = (d.today() - d.fromisoformat(dt)).days
            data = {}
            data['endDate'] = dt
            data['daysTill'] = daysTill
            return jsonify(data), 200
        else:
            return jsonify({'reason': "Lease not found"}), 404
    else:
        return jsonify({'reason': "Rental not found"}), 404


@app.route('/getdocuments', methods=['GET'])
@login_required
def get_documents():
    rentalID = request.args.get('rentalID')
    rental = dq.getRentalByRentalID(rentalID)
    if rental is not None:
        lease = dq.getLeaseByLeaseID(rental.lease)
        if lease is not None:
            doc = dq.getDocByDocID(lease.document)
            if doc is not None:
                return jsonify({'doc': doc.document}), 200
        else:
            return jsonify({'reason': "Lease not found"}), 404
    else:
        return jsonify({'reason': "Rental not found"}), 404


@app.route('/getinfo', methods=['GET'])
@login_required
def get_info():
    ''' emergency contact info and the user info
    '''
    data = {}
    userID = request.args.get('userID')
    user = dq.getUserById(userID)
    contacts = dq.getContactsWithAssocUser(userID)
    if len(contacts) != 0:
        for num in range(len(contacts)):
            contact_str = 'contact' + repr(num)
            data[contact_str] = {}
            data[contact_str]['relation'] = contacts[num].relationship
            name = contacts[num].firstName + contacts[num].lastName
            data[contact_str]['name'] = name
            data[contact_str]['phoneNumber'] = contacts[num].phoneNumber
    else:
        return jsonify({'reason': "No associated contacts found"}), 404

    if user is not None:
        data['firstName'] = user.firstName
        data['lastName'] = user.lastName
        data['phoneNumber'] = user.phoneNumber
        data['email'] = user.email
        return jsonify(data), 200
    else:
        return jsonify({'reason': "User not found"}), 404


@app.route('/getroommates', methods=['GET'])
@login_required
def get_roommates():
    userID = request.args.get('userID')
    rentalID = request.args.get('rentalID')
    rental = dq.getRentalByRentalID(rentalID)
    if rental is not None:
        roommates = dq.getRoommatesByID(rental.roommates, userID)
        data = {}
        for num in range(len(roommates)):
            val = 'roommate' + repr(num)
            data[val] = {}
            name = roommates[num].firstName + roommates[num].lastName
            data[val]['name'] = name
            data[val]['phoneNumber'] = roommates[num].phoneNumber
            data[val]['email'] = roommates[num].email
        return jsonify(data), 200
    else:
        return jsonify({'reason': "Rental not found"}), 404


@app.route('/getrentalIDs', methods=['GET'])
@login_required
def get_rental_IDs():
    userID = request.args.get('userID')
    user = dq.getUserById(userID)
    if user is not None:
        data = {}
        data['currentRental'] = user.currentRental
        data['pastRental'] = user.pastRental
        return jsonify(data), 200
    else:
        return jsonify({'reason': "User not found"}), 404


@app.route('/updateuserinfo', methods=['POST'])
@login_required
def update_user_info():
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    phoneNumber = request.json['phoneNumber']
    email = request.json['email']
    userID = request.json['userID']
    user = dq.getUserById(userID)
    check = dq.getUserByEmail(email)

    if check is not None:
        return jsonify({'Reason': "Email already in use"}), 400

    dq.update(user, 'firstName', firstName)
    dq.update(user, 'lastName', lastName)
    dq.update(user, 'phoneNumber', phoneNumber)
    dq.update(user, 'email', email)

    return jsonify({}), 200


def _change_password(user: Users, password: str):
    dq.update(user, 'password', pbkdf2_sha256.hash(password))


def _validate(user: Users, password: str) -> bool:
    return user is not None and pbkdf2_sha256.verify(password, user.password)


def load_user(user_id):
    return dq.getUserById(int(user_id))


_login.user_loader(load_user)


def unauthorized():
    return jsonify({'reason': "Not logged in"}), 403


_login.unauthorized_handler(unauthorized)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80)
