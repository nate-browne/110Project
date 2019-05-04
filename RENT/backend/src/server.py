from flask import Flask, request, jsonify
from database import Users, getUserByObject

# Local database URL for everyone
DB_URL = 'mysql://root@localhost/rent'

app = Flask(__name__)
app.secret_key = 'aabjeetGx2LaCC1a4opBUsc95a6KmbKX20hHIq8ie5r8FJx5S9fSTk2hYsz8\
5BLfNxk9vjw'
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL


@app.route('/login', methods=["POST"])
def login():
    email = request.json['email']
    password = request.json['password']

    user = Users(email, password)
    user = getUserByObject(user)

    if user is not None:
        return jsonify(user), 200
    else:
        return {}, 204


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
