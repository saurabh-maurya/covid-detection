import requests
url = 'http://localhost:5000/predictCovidStatus'
r = requests.post(url,json={'Ques':[1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0],})
print(r.json())
# r = requests.post(url,json={'Ques':[1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0],}) # Infected
# r = requests.post(url,json={'Ques':[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],}) # Moderate
# r = requests.post(url,json={'Ques':[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],}) # Safe