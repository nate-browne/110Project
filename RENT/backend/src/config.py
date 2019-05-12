from flask import Flask

# Local database URL for everyone
DB_URL = 'mysql://root:4ve4g617@localhost/rent'

app = Flask(__name__)
app.secret_key = 'aabjeetGx2LaCC1a4opBUsc95a6KmbKX20hHIq8ie5r8FJx5S9fSTk2hYsz8\
5BLfNxk9vjw'
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFACTIONS'] = False
