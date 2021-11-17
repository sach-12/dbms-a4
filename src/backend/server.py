from flask import Flask, request, make_response, redirect
from flask.templating import render_template
import db

app = Flask(__name__)


@app.route("/api/checklogin", methods=['POST'])
def checkLogin():
    if request.method == 'POST':
        uname = request.get_json()['_uname']
        pwd = request.get_json()['_pwd']
        session = db.connectDb(uname=uname, pwd=pwd)
        if session == 'authfail':
            return 'Authorisation failed, try again', 405
        else:
            ret = make_response(f'Authorisation success! Logged in as {uname}', 200)
            ret.set_cookie('uname', uname)
            ret.set_cookie('pwd', pwd)
            return ret
    else:
        return f'{request.method} not supported for this page', 404


@app.route("/api/gettable", methods=['POST'])
def getTable():
    if request.method == 'POST':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if(uname == None or pwd == None):
            return 'authfail', 405
        table = request.get_json()["_table"]
        session = db.connectDb(uname=uname, pwd=pwd)
        ret = db.getTable(relation=table, session=session)
        return str(ret), 200
    else:
        return f'{request.method} not supported for this page', 404


@app.route("/home", methods = ['GET'])
def home():
    if request.method == 'GET':
        return 'ok', 200
        # return render_template("index.html")
    else:
        return f'{request.method} not supported for this page', 404


@app.rout("/admin", methods = ['GET'])
def admin():
    if request.method == 'GET':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None):
            return 'something went wrong', 404
            # return render_template("index.html")
        elif uname != 'admin':
            return 'something went wrong', 404
            # return render_template("index.html")
        else:
            return 'good', 200
            # return render_template("admin.html")


@app.route("/mod", methods = ['GET'])
def mod():
    if request.method == 'GET':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None):
            return 'something went wrong', 404
            # return render_template("index.html")
        elif uname != 'mod':
            return 'something went wrong', 404
            # return render_template("index.html")
        else:
            return 'good', 200
            # return render_template("mod.html")


@app.route("/staff", methods = ['GET'])
def staff():
    if request.method == 'GET':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None):
            return 'something went wrong', 404
            # return render_template("index.html")
        elif uname != 'staff':
            return 'something went wrong', 404
            # return render_template("index.html")
        else:
            return 'good', 200
            # return render_template("staff.html")


if __name__ == '__main__':
    app.debug = False
    app.run(port=8080,host='0.0.0.0')
