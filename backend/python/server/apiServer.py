import populartimes

from flask import Flask

app = Flask(__name__)

@app.route('/populartimes', methods=['GET'])
def get_popTimesFromPlaceId():
    api_key = request.args.get('api_key')
    place_id = request.args.get('place_id')
    result = populartimes.get_id(api_key, place_id)

    return jsonify({'result': result})


@app.route('/populartimesArea', methods=['GET'])
def get_popTimesFromPlaceId():

    api_key = request.args.get('api_key')
    placeType = request.args.get('type')
    #TODO: points are of type (float, float); lat/lng of point delimiting the search area; e.g. (48.142199, 11.580047), need to check input
    point1 = request.args.get('p1')
    point2 = request.args.get('p2')
    radius = request.args.get('radius')

    #Eg. populartimes.get("your-api-key", ["bar"], (48.132986, 11.566126), (48.142199, 11.580047))

    result = populartimes.get(api_key, [placeType], point1, point2)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)