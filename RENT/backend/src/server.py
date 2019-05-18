from flask import request, jsonify
from passlib.hash import pbkdf2_sha256
from flask_login import login_manager, login_user, login_required, logout_user

from config import app
import database as db
import mailer


@login_manager.user_loader
def load_user(user_id):
    return db.getUserById(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return 403


@app.route('/createuser', methods=['POST'])
def createuser():
    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    password = pbkdf2_sha256.hash(request.json['password'])
    user = db.Users(email=email, firstName=firstName, lastName=lastName,
                    password=password)

    # check if user exists and redirect them if they do
    if db.isUser(user):
        return jsonify({}), 300
    else:
        # create user in the DB and return success
        db.addUser(user)
        return jsonify({}), 201


@app.route('/forgotpassword', methods=['POST'])
def forgot_password():
    user = db.getUserByEmail(request.json['email'])
    if user is not None:
        temp = mailer.send_mail(user.email)
        _change_password(user, temp)
    else:
        return jsonify({}), 300


def _change_password(user: db.Users, password: str):
    db.updatePassword(user, pbkdf2_sha256.hash(password))


@app.route('/resetpassword', methods=['POST'])
@login_required
def reset_password(email: str, password: str):
    pass  # TODO: finish this


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({}), 200


@app.route('/login', methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']
    remember = True if request.json['remember'] == 'true' else False

    user = db.getUserByEmail(email)

    if _validate(user, password):
        login_user(user, remember=remember)
        return jsonify({'userID': user.id, 'firstName': user.firstName}), 200
    else:
        return jsonify({}), 404


@app.route('/getinfo', methods=['GET'])
@login_required
def get_info():
    userID = request.args.get('userID')
    user = db.getUserById(userID)
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
    rental = db.getRentalByRentalID(rentalID)
    if rental is not None:
        roommates = db.getRoomatesByID(rental.roommates, userID)
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
    user = db.getUserById(userID)
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
    contacts = db.getContactWithAssocUser(userID)
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


def _validate(user: db.Users, password: str) -> bool:
    return user is not None and pbkdf2_sha256.verify(password, user.password)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
