from flask import request, jsonify
from passlib.hash import pbkdf2_sha256

from config import app
import database as db
import mailer


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
        change_password(user, temp)
    else:
        return jsonify({}), 300


def change_password(user: db.Users, password: str):
    db.updatePassword(user, pbkdf2_sha256.hash(password))


@app.route('/resetpassword', methods=['POST'])
def reset_password(email: str, password: str):
    pass


@app.route('/logout', methods=['POST'])
def logout():
    pass


@app.route('/login', methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user = db.getUserByEmail(email)

    if user is not None and pbkdf2_sha256.verify(password, user.password):
        return jsonify({'loggedIn': True, 'firstName': user.firstName}), 200
    else:
        return jsonify({}), 404


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
