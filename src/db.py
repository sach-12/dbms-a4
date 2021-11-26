from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dbmodels import *


def connectDb(uname: str, pwd: str):
    connect_url = f'postgresql://{uname}:{pwd}@localhost:5432/gymd'
    db = create_engine(connect_url)
    try:
        db.connect()
        Session = sessionmaker(db)
        session = Session()
        return session
    except Exception as e:
        if 'OperationalError' in str(e):
            return 'authfail'
        else:
            raise e


def getTable(relation: str, session):
    relation = relation.lower()
    retList = []
    if relation == 'member':
        obj = Member
        key = "memberid"
    elif relation == 'trainer':
        obj = Trainer
        key = "trainerid"
    elif relation == 'wplan':
        obj = WPlan
        key = "mid"
    elif relation == 'snp':
        obj = SNP
        key = "sap"
    elif relation == 'dplan':
        obj = DPlan
        key = "mid"
    elif relation == 'nutritionist':
        obj = Nutritionist
        key = "nid"
    elif relation == 'adm':
        obj = ADM
        key = "aid"
    elif relation == 'payment':
        obj = Payment
        key = "pid"
    elif relation == 'equipment':
        obj = Equipment
        key = "ename"
    elif relation == 'gym':
        obj = Gym
        key = "gymid"
    else:
        return []
    table = session.query(obj).all()
    for row in table:
        r = vars(row)
        r.pop('_sa_instance_state', None)
        retList.append(r)
    retList = sorted(retList, key=lambda x: x[key])
    return retList


def modifyTable(table: str, id: int, changes: dict, session):
    relation = table.lower()
    if relation == 'member':
        obj = Member
        res = session.query(obj).filter(obj.memberid == id)
    elif relation == 'trainer':
        obj = Trainer
        res = session.query(obj).filter(obj.trainerid == id)
    elif relation == 'wplan':
        obj = WPlan
        res = session.query(obj).filter(obj.mid == id)
    elif relation == 'snp':
        obj = SNP
        res = session.query(obj).filter(obj.sap == id)
    elif relation == 'dplan':
        obj = DPlan
        res = session.query(obj).filter(obj.mid == id)
    elif relation == 'nutritionist':
        obj = Nutritionist
        res = session.query(obj).filter(obj.nid == id)
    elif relation == 'adm':
        obj = ADM
        res = session.query(obj).filter(obj.aid == id)
    elif relation == 'payment':
        obj = Payment
        res = session.query(obj).filter(obj.pid == id)
    elif relation == 'gym':
        obj = Gym
        res = session.query(obj).filter(obj.gymid == id)
    else:
        return "bad"
    try:
        for key in changes:
            res.update({getattr(obj, key): changes[key]}, synchronize_session = False)
        session.commit()
    except Exception as e:
        return e
    return "good"


def deleteRecord(table: str, id: int, session):
    relation = table.lower()
    if relation == 'member':
        obj = Member
        res = session.query(obj).filter(obj.memberid == id)
    elif relation == 'trainer':
        obj = Trainer
        res = session.query(obj).filter(obj.trainerid == id)
    elif relation == 'wplan':
        obj = WPlan
        res = session.query(obj).filter(obj.mid == id)
    elif relation == 'snp':
        obj = SNP
        res = session.query(obj).filter(obj.sap == id)
    elif relation == 'dplan':
        obj = DPlan
        res = session.query(obj).filter(obj.mid == id)
    elif relation == 'nutritionist':
        obj = Nutritionist
        res = session.query(obj).filter(obj.nid == id)
    elif relation == 'adm':
        obj = ADM
        res = session.query(obj).filter(obj.aid == id)
    elif relation == 'payment':
        obj = Payment
        res = session.query(obj).filter(obj.pid == id)
    elif relation == 'gym':
        obj = Gym
        res = session.query(obj).filter(obj.gymid == id)
    else:
        return "bad"
    try:
        session.delete(res[0])
        session.commit()
    except Exception as e:
        return str(e)
    return "good"


def addRecord(table: str, changes: dict, session):
    relation = table.lower()
    if relation == 'm':
        obj = Member(
            changes["memberid"],
            changes["mname"],
            changes["mphno"],
            changes["doj"],
            changes["mplan"],
            changes["maddress"],
            changes["tid"],
            changes["nutrid"],
            changes["gid"]
        )
    elif relation == 't':
        obj = Trainer(
            changes["trainerid"],
            changes["tname"],
            changes["tphno"],
            changes["tsalary"]
        )
    elif relation == 'w':
        obj = WPlan(
            changes["tid"],
            changes["mid"],
            changes["duration"],
            changes["mgroup"],
            changes["wsap"]
        )
    elif relation == 's':
        obj = SNP(
            changes["sap"],
            changes["sts"],
            changes["reps"]
        )
    elif relation == 'd':
        obj = DPlan(
            changes["mid"],
            changes["dtype"],
            changes["calories"],
            changes["nutrid"]
        )
    elif relation == 'n':
        obj = Nutritionist(
            changes["nid"],
            changes["nname"],
            changes["nincome"],
            changes["nvd"],
            changes["gid"]
        )
    elif relation == 'a':
        obj = ADM(
            changes["aid"],
            changes["aname"],
            changes["aemail"],
            changes["aphno"],
            changes["gid"]
        )
    elif relation == 'p':
        obj = Payment(
            changes["pid"],
            changes["pmode"],
            changes["gstno"],
            changes["mid"],
            changes["amount"],
            changes["admid"]
        )
    elif relation == 'g':
        obj = Gym(
            changes["gymid"],
            changes["gname"],
            changes["grating"],
            changes["gloc"]
        )
    else:
        return "bad"
    try:
        session.add(obj)
        session.commit()
    except Exception as e:
        return str(e)
    return "good"