import json
import requests
import hashlib
from datetime import date, timedelta

# REQUEST HEADERS
# headers = {'Accept': 'application/json', "Authorization": "Token token=<TOKEN>"}
#
# # INDEX END POINT
# uri = "http://localhost:3000/api/meals"
# res = requests.request("GET", uri, headers=headers)
# print(res.content)
#
# # UPDATE END POINT
# uri = "http://localhost:3000/api/meals/MEAL_ID"
# params = json.dumps({ATTRS_TO_UPDATE})
# res = requests.request("PATCH", uri, params={'meal': params}, headers=headers)
# print(res.content)
#
# # CREATE END POINT
# params = json.dumps({ATTRS_TO_CREATE})
# print params
# res = requests.request("POST", uri, params={'meal': params}, headers=headers)
# print(res.content)
#
# # DELETE END POINT
# uri = "http://localhost:3000/api/meals/MEAL_ID"
# res = requests.request("DELETE", uri, headers=headers)
# print(res)

headers = {'Accept': 'application/json', "Authorization": "Token token=<TOKEN>"}
uri = "http://localhost:3000/api/meals"
res = requests.request("GET", uri, headers=headers)
print(res.content)
