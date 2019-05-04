from typing import Optional
from flask_sqlalchemy import SQLAlchemy

from server import app

db = SQLAlchemy(app)

class Users(db.Model):
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  email = db.Column(db.String(255), unique=True, nullable=False)
