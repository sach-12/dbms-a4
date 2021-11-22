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
        table = session.query(Member).all()
        
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
            
    elif relation == 'trainer':
        obj = Trainer
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'wplan':
        obj = WPlan
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'snp':
        obj = SNP
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'dplan':
        obj = DPlan
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'nutritionist':
        obj = Nutritionist
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'adm':
        obj = ADM
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'payment':
        obj = Payment
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'equipment':
        obj = Equipment
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    elif relation == 'gym':
        obj = Gym
        table = session.query(obj).all()
        for row in table:
            r = vars(row)
            r.pop('_sa_instance_state', None)
            retList.append(r)
    else:
        pass
    # table = session.query(obj).all()
    # for row in table:
    #     r = vars(row)
    #     r.pop('_sa_instance_state', None)
    #     retList.append(r)
    return retList


