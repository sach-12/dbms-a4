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
    elif relation == 'trainer':
        obj = Trainer
    elif relation == 'wplan':
        obj = WPlan
    elif relation == 'snp':
        obj = SNP
    elif relation == 'dplan':
        obj = DPlan
    elif relation == 'nutritionist':
        obj = Nutritionist
    elif relation == 'adm':
        obj = ADM
    elif relation == 'payment':
        obj = Payment
    elif relation == 'equipment':
        obj = Equipment
    elif relation == 'gym':
        obj = Gym
    else:
        return []
    table = session.query(obj).all()
    for row in table:
        r = vars(row)
        r.pop('_sa_instance_state', None)
        retList.append(r)
    return retList


