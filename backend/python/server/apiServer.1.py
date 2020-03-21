import populartimes

from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

result = populartimes.get_id("apikey", "ChIJSYuuSx9awokRyrrOFTGg0GY")
print(result)
