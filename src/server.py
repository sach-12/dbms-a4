from flask import Flask, request, make_response, render_template, send_from_directory, redirect, jsonify
from flask_cors import CORS
import db

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/<path:path>")
def static_dir(path):
    return send_from_directory("static", path)


@app.route("/api/checklogin", methods=['POST'])
def checkLogin():
    if request.method == 'POST':
        uname = request.get_json(force=True)['_uname']
        pwd = request.get_json(force=True)['_pwd']
        session = db.connectDb(uname=uname, pwd=pwd)
        if session == 'authfail':
            return 'Authorisation failed, try again', 403
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
            return 'authfail', 403
        table = request.get_json(force=True)["_table"]
        session = db.connectDb(uname=uname, pwd=pwd)
        ret = db.getTable(relation=table, session=session)
        return jsonify(ret), 200
    else:
        return f'{request.method} not supported for this page', 404


@app.route("/", methods = ['GET'])
def empty():
    return redirect("/home")


@app.route("/home", methods = ['GET'])
def home():
    if request.method == 'GET':
        ret = make_response(render_template("home/index.html"))
        ret.set_cookie("uname", "", expires=0)
        ret.set_cookie("pwd", "", expires=0)
        return ret
    else:
        return f'{request.method} not supported for this page', 404


@app.route("/admin", methods = ['GET'])
def admin():
    if request.method == 'GET':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None):
            return redirect("/home")
        elif uname != 'admin':
            return redirect("/home")
        else:
            return render_template("admin/admin.html")


@app.route("/mod", methods = ['GET'])
def mod():
    if request.method == 'GET':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None):
            return redirect("/home")
        elif uname != 'mod':
            return redirect("/home")
        else:
            return render_template("mod/mod.html")


@app.route("/staff", methods = ['GET'])
def staff():
    if request.method == 'GET':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None):
            return redirect("/home")
        elif uname != 'staff':
            return redirect("/home")
        else:
            return render_template("staff/staff.html")


@app.route("/api/add", methods = ['POST'])
def addRec():
    if request.method == 'POST':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None or uname != 'admin'):
            return redirect("/home")
        else:
            dat = request.get_json(force=True)
            tid = dat.pop("main")[0]
            session = db.connectDb(uname=uname, pwd=pwd)
            ret = db.addRecord(tid, dat, session)
            if(ret == "good"):
                return "done", 200
            else:
                return ret, 403


@app.route("/api/modify", methods = ['POST'])
def modify():
    if request.method == 'POST':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None or uname == 'mod'):
            return redirect("/home")
        else:
            dat = request.get_json(force=True)
            tid = dat.pop("main")
            table = str(tid.split("_")[0].strip())
            id = int(tid.split("_")[1].strip())
            session = db.connectDb(uname=uname, pwd=pwd)
            ret = db.modifyTable(str(table), int(id), dat, session)
            if(ret == "good"):
                return "done", 200
            else:
                return ret, 403


@app.route("/api/delete", methods = ['POST'])
def delete():
    if request.method == 'POST':
        uname = request.cookies.get('uname')
        pwd = request.cookies.get('pwd')
        if (uname == None or pwd == None or uname != 'admin'):
            return redirect("/home")
        else:
            dat = request.get_json(force=True)
            tid = dat.pop("main")
            session = db.connectDb(uname=uname, pwd=pwd)
            table = str(tid.split("_")[0].strip())
            id = int(tid.split("_")[1].strip())
            ret = db.deleteRecord(table, id, session)
            if(ret == "good"):
                return "done", 200
            else:
                return ret, 403


if __name__ == '__main__':
    app.debug = False
    app.run(port=8080,host='0.0.0.0')
