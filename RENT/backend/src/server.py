import db
from passlib.hash import sha256_crypt
from flask import Flask, request, abort, jsonify, url_for, make_response

app = Flask(__name__)
app.secret_key = 'aabjeetGx2LaCC1a4opBUsc95a6KmbKX20hHIq8ie5r8FJx5S9fSTk2hYsz85BLfNxk9vjw'
app.config['SQLALCHEMY_DATABASE_URI'] = db.DB_URL

database = db.DB(app)

@app.route('/')
def hello() -> str:
  return "hello"

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0')
