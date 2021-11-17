from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
base = declarative_base()

class Member(base):

    __tablename__ = "member"
    memberid = Column(Integer, primary_key=True, nullable=False)
    mname = Column(String(50), nullable=False)
    mphno = Column(String(10), nullable=False)
    doj = Column(Date, nullable=False)
    mplan = Column(Integer, nullable=False)
    maddress = Column(String(200), nullable=False)
    tid = Column(Integer, nullable=False)
    nutrid = Column(Integer, nullable=False)
    gid = Column(Integer, nullable=False)

    def __init__(self, memberid, mname, mphno, doj, mplan, maddress, tid, nutrid, gid):
        self.memberid = memberid
        self.mname = mname
        self.mphno = mphno
        self.doj = doj
        self.mplan = mplan
        self.maddress = maddress
        self.tid = tid
        self.nutrid = nutrid
        self.gid = gid


class Trainer(base):

    __tablename__ = "trainer"
    trainerid = Column(Integer, nullable=False, primary_key=True)
    tname = Column(String(50), nullable=False)
    tphno = Column(String(10), nullable=False)
    tsalary = Column(Integer, nullable=False)

    def __init__(self, trainerid, tname, tphno, tsalary):
        self.trainerid = trainerid
        self.tname = tname
        self.tphno = tphno
        self.tsalary = tsalary


class WPlan(base):

    __tablename__ = "wplan"
    tid = Column(Integer, nullable=False)
    mid = Column(Integer, nullable=False, primary_key=True)
    duration = Column(Integer)
    mgroup = Column(String(20))
    wsap = Column(Integer)

    def __init__(self, tid, mid, duration, mgroup, wsap):
        self.tid = tid
        self.mid = mid
        self.duration = duration
        self.mgroup = mgroup
        self.wsap = wsap


class SNP(base):

    __tablename__ = "snp"
    sap = Column(Integer, nullable=False, primary_key=True)
    sts = Column(Integer)
    reps = Column(Integer)

    def __init__(self, sap, sts, reps):
        self.sap = sap
        self.sts = sts
        self.reps = reps


class DPlan(base):
    __tablename__ = "dplan"
    mid = Column(Integer, nullable=False, primary_key=True)
    dtype = Column(String(50), nullable=False, primary_key=True)
    calories = Column(Integer, nullable=False, primary_key=True)
    nutrid = Column(Integer, nullable=False)

    def __init__(self, mid, dtype, calories, nutrid):
        self.mid = mid
        self.dtype = dtype
        self.calories = calories
        self.nutrid = nutrid


class Nutritionist(base):
    __tablename__ = "nutritionist"
    nid = Column(Integer, nullable=False, primary_key=True)
    nname = Column(String(50), nullable=False)
    nincome = Column(Integer, nullable=False)
    nvd = Column(String(15))
    gid = Column(Integer, nullable=False)

    def __init__(self, nid, nname, nincome, nvd, gid):
        self.nid = nid
        self.nname = nname
        self.nincome = nincome
        self.nvd = nvd
        self.gid = gid


class ADM(base):
    __tablename__ = "adm"
    aid = Column(Integer, nullable=False, primary_key=True)
    aname = Column(String(50), nullable=False)
    aemail = Column(String(50))
    aphno = Column(String(10), nullable=False)
    gid = Column(Integer, nullable=False)

    def __init__(self, aid, aname, aemail, aphno, gid):
        self.aid = aid
        self.aname = aname
        self.aemail = aemail
        self.aphno = aphno
        self.gid = gid


class Payment(base):
    __tablename__ = "payment"
    pid = Column(Integer, nullable=False, primary_key=True)
    pmode = Column(String(10), nullable=False)
    gstno = Column(String(15))
    mid = Column(Integer, nullable=False)
    amount = Column(Integer)
    admid = Column(Integer, nullable=False)

    def __init__(self, pid, pmode, gstno, mid, amount, admid):
        self.pid = pid
        self.pmode = pmode
        self.gstno = gstno
        self.mid = mid
        self.amount = amount
        self.admid = admid


class Equipment(base):
    __tablename__ = "equipment"
    ename = Column(String(20), nullable=False, primary_key=True)
    etype = Column(String(20), nullable=False)
    eweightden = Column(Integer, nullable=False, primary_key=True)
    gid = Column(Integer, nullable=False, primary_key=True)

    def __init__(self, ename, etype, eweightden, gid):
        self.ename = ename
        self.etype = etype
        self.eweightden = eweightden
        self.gid = gid


class Gym(base):
    __tablename__ = "gym"
    gymid = Column(Integer, nullable=False, primary_key=True)
    gname = Column(String(50), nullable=False)
    grating = Column(Integer)
    gloc = Column(String(100), nullable=False)

    def __init__(self, gymid, gname, grating, gloc):
        self.gymid = gymid
        self.gname = gname
        self.grating = grating
        self.gloc = gloc
