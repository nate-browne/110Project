from flask import Flask, request, jsonify

import database as db

# Local database URL for everyone
DB_URL = 'mysql://root@localhost/rent'

app = Flask(__name__)
app.secret_key = 'aabjeetGx2LaCC1a4opBUsc95a6KmbKX20hHIq8ie5r8FJx5S9fSTk2hYsz8\
5BLfNxk9vjw'
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL


@app.route('/createuser', methods=['POST'])
def createuser():
    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    password = request.json['password']
    user = db.Users(email=email, first_name=firstName, last_name=lastName,
                    password=password)

    # check if user exists
    if db.isUser(user):
        return {}, 404
    else:
        # create user
        return {}, 201


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
