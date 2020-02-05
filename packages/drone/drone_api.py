import airsim
from flask import Flask, Response
from flask_restful import Resource, Api, reqparse
from json import dumps
from flask_jsonpify import jsonify
from airsimgeo import AirSimGeoClient

srid = 'EPSG:5555'
origin = (16.0740589, 61.8295161, 0.0)


client = AirSimGeoClient(srid=srid, origin=origin)
client.confirmConnection()
client.enableApiControl(True)
client.armDisarm(True)


app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

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

class Drone_Move_To_Position(Resource):
    def post(self):
        parser.add_argument('latitude', type=float)
        parser.add_argument('longitude', type=float)
        args = parser.parse_args
        client.moveToPositionAsyncGeo(gps=(args.longitude, args.latitude, 15), velocity=10)
        return Response(status = 204)




api.add_resource(Drone_Take_Off, '/drone/take_off')
api.add_resource(Drone_Land, '/drone/land')
api.add_resource(Drone_Gps_Data, '/drone/gps_data')
api.add_resource(Drone_Move_To_Position, '/drone/move_to_position')


if __name__ == '__main__':
    app.run(port='5002')