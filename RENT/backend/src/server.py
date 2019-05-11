from flask import request, jsonify

from config import app
import database as db

from passlib.hash import pbkdf2_sha256


@app.route('/', methods=["GET"])
def hello():
    return "Hello Akshay"


@app.route('/createuser', methods=['POST'])
def createuser():
    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    password = pbkdf2_sha256.hash(request.json['password'])
    user = db.Users(email=email, first_name=firstName, last_name=lastName,
                    password=password)

    # check if user exists
    if db.isUser(user):
        return {}, 404
    else:
        # create user
        return {}, 201


@app.route('/testcreateuser')
def testcreateuser():
    user = db.Users(email="fake@fake.net", first_name="Johnny",
                    last_name="Test", password='lmaowhatevenissecurity')
    db.addUser(user)


@app.route('/login', methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user = db.getUserByLogin([email, password])

    if user is not None:
        rental = db.getRentalByRentalID(user.rental)
        return jsonify(rental), 200
    else:
        return {}, 204


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
