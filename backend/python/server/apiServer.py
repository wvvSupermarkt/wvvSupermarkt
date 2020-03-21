import populartimes

from flask import Flask
from flask import request
from flask import jsonify

app = Flask(__name__)

@app.route('/populartimes', methods=['GET'])
def get_popTimesFromPlaceId():
    api_key = request.args.get('api_key')
    place_id = request.args.get('place_id')
    result = populartimes.get_id(api_key, place_id)

    return jsonify({'result': result})


@app.route('/populartimesArea', methods=['GET'])
def get_popTimesFromArea():

    api_key = request.args.get('api_key')
    placeType = request.args.get('placeType')
    #TODO: points are of type (float, float); lat/lng of point delimiting the search area; e.g. (48.142199, 11.580047), need to check input
    point1 = request.args.get('p1')
    point2 = request.args.get('p2')
    radius = request.args.get('radius')

    print ('api_key ', api_key)
    print ('placeType ',placeType)
    print ('point1 ', point1)

#    result = populartimes.get("your-api-key", ["bar"], (48.132986, 11.566126), (48.142199, 11.580047))

    result = populartimes.get(api_key, ["bar"], (48.132986, 11.566126), (48.142199, 11.580047))

    print(result)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)