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


@app.route('/populartimesArea', methods = ['POST'])
def postJsonHandler():
    print (request.is_json)
    content = request.get_json()
    print (content["p1"][0])
    result = populartimes.get(content["api_key"], [content["placeType"]], content["p1"], content["p2"],20,content["radius"] )

    print(result)
    return jsonify({'result': result})



if __name__ == '__main__':
    app.run(debug=True)