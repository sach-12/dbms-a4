import requests

dat = {"_uname": "postgres", "_pwd": "post_123"}
url = "http://127.0.0.1:8080/api/checklogin"
res = requests.post(url=url, json=dat)
print(res.status_code)
print(res.text)
print(res.cookies)

url2 = "http://127.0.0.1:8080/api/gettable"
cook = res.cookies
dat2 = {"_table": "member"}
res2 = requests.post(url=url2,  json=dat2)
print(res2.status_code)
print(res2.text)