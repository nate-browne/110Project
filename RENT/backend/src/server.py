from flask import request, jsonify
from passlib.hash import pbkdf2_sha256
from flask_login import login_user, login_required, logout_user

from utils import mailer
from config import app, _login

import database.queries as dq
from database.models import Users, Rental, Roommates


@app.route('/createuser', methods=['POST'])
def createuser():
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
        dq.addUser(user)
        return jsonify({}), 201


@app.route('/addroommate', methods=['POST'])
@login_required
def add_roommate():
    '''This route is used to add a roommate to a given rental\n
    It can only be reached via POST request.\n
    The route expects that the data comes in with the following fields:\n
    item - JSON tag - description
    rentalID - 'rentalID' - ID of the rental to add the roommate to
    email - 'email' - email of the roommmate to add
    '''

    rentalID = request.json['rentalID']
    email = request.json['email']
    user = dq.getUserByEmail(email)

    if user is None:
        return jsonify({'Reason': "User doesn't exist"}), 404

    rental = dq.getRentalByRentalID(rentalID)
    if rental is None:
        return jsonify({'Reason': "Rental does not exist"}), 404

    roommates = dq.getRentalRoommates(rental.roommates)

    if roommates is not None:
        # Filter out the roommate attributes from the field
        mates = list(filter(lambda x: x.startswith('room'), dir(roommates)))
        for ind, ent in enumerate(mates):
            if ent is None:
                ind += 1
                dq.updateRoommate(roommates, ind, user.id)
                dq.updateUserRentals(user, rentalID)
                return jsonify({}), 201
        return jsonify({'Reason': "Adding 6th Roommate is not allowed"}), 400
    else:
        err = "Roommates table somehow doesn't exist???"
        return jsonify({'Reason': err}), 404


@app.route('/deleteroommate', methods=['POST'])
@login_required
def delete_roommate():

    rentalID = request.json['rentalID']
    email = request.json['email']
    user = dq.getUserByEmail(email)

    roommatesID = dq.getRentalByRentalID(rentalID).roommates
    roommates = dq.getRentalRoommates(roommatesID)
    mates = list(filter(lambda x: x.startswith('room'), dir(roommates)))
    for ind, ent in enumerate(mates):
        if user.id == ent:
            dq.updateUserRentals(user, None)
            ind += 1
            dq.updateRoommate(roommates, ind, None)
            return jsonify({}), 201
    return jsonify({'Reason': "Roommate isn't a roommate"}), 404


@app.route('/deleteuser', methods=['POST'])
@login_required
def delete_user():
    email = request.json['email']
    user = dq.getUserByEmail(email)
    dq.deleteUser(user)
    return jsonify({}), 201


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
    dq.addRoommatesRow(roommates)
    rental = Rental(address=address, roommates=roommates.id)
    dq.addRental(rental)
    dq.updateUserRentals(user, rental.id)

    return jsonify({}), 201


@app.route('/forgotpassword', methods=['POST'])
def forgot_password():
    user = dq.getUserByEmail(request.json['email'])
    if user is not None:
        temp = mailer.send_mail(user.email)
        _change_password(user, temp)
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
        login_user(user, remember=remember)
        return jsonify({'userID': user.id, 'firstName': user.firstName}), 200
    else:
        return jsonify({'reason': "User/Password doesn't match"}), 400


@app.route('/getaddress', methods=['GET'])
@login_required
def get_address():
    rentalID = request.args.get('rentalID')
    rental = dq.getRentalByRentalID(rentalID)
    if rental is not None:
        return jsonify(rental.address), 200
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
            return jsonify(lease.endDate), 200
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
                return jsonify(doc.document), 200
        else:
            return jsonify({'reason': "Lease not found"}), 404
    else:
        return jsonify({'reason': "Rental not found"}), 404


@app.route('/getinfo', methods=['GET'])
@login_required
def get_info():
    userID = request.args.get('userID')
    user = dq.getUserById(userID)
    if user is not None:
        data = {}
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


@app.route('/getemergencyinfo', methods=['GET'])
@login_required
def get_emergency_info():
    userID = request.args.get('userID')
    contacts = dq.getContactWithAssocUser(userID)
    if len(contacts) != 0:
        data = {}
        for num in range(len(contacts)):
            contact_str = 'contact' + repr(num)
            data[contact_str] = {}
            data[contact_str]['relation'] = contacts[num].relationship
            name = contacts[num].firstName + contacts[num].lastName
            data[contact_str]['name'] = name
            data[contact_str]['phoneNumber'] = contacts[num].phoneNumber
        return jsonify(data), 200
    else:
        return jsonify({'reason': "No associated contacts found"}), 404


def _change_password(user: Users, password: str):
    dq.updatePassword(user, pbkdf2_sha256.hash(password))


def _validate(user: Users, password: str) -> bool:
    return user is not None and pbkdf2_sha256.verify(password, user.password)


def load_user(user_id):
    return dq.getUserById(int(user_id))


_login.user_loader(load_user)


def unauthorized():
    return jsonify({'reason': "Not logged in"}), 403


_login.unauthorized_handler(unauthorized)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
