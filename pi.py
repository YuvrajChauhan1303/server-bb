import requests
data = {"data": "Hello from Raspberry Pi"}
requests.post("http://localhost:3000/send", json=data)
