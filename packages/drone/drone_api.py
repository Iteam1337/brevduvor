import airsim
from flask import Flask, Response
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify

client = airsim.MultirotorClient()
client.confirmConnection()
client.enableApiControl(True)
client.armDisarm(True)


app = Flask(__name__)
api = Api(app)

class Drone_Take_Off(Resource):
    def post(self):
        client.takeoffAsync()
        return Response(status = 204)

class Drone_Land(Resource):
    def post(self):
        client.landAsync()
        return Response(status = 204)

class Drone_Gps_Data(Resource):
    def get(self):
        result = client.getGpsData().gnss.geo_point
        return jsonify({
            "latitude": result.latitude,
            "longitude": result.longitude
        })




api.add_resource(Drone_Take_Off, '/drone/take_off')
api.add_resource(Drone_Land, '/drone/land')
api.add_resource(Drone_Gps_Data, '/drone/gps_data')


if __name__ == '__main__':
    app.run(port='5002')