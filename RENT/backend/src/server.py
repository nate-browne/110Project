from flask import Flask, request, abort, jsonify

app = Flask(__name__)

@app.route('/')
def hello() -> str:
  return "hello"


if __name__ == "__main__":
  app.run()
