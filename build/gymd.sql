drop database gymd;
drop role if exists admin,mod,staff;
create database gymd;

\c gymd

CREATE TABLE    Member
(
    MemberID INT NOT NULL,
    MName VARCHAR(50) NOT NULL,
    MPhNo VARCHAR(10) NOT NULL,
    DOJ DATE NOT NULL,
    MPlan INT NOT NULL,
    MAddress VARCHAR(200) NOT NULL,
    TID INT NOT NULL,
    NutrID INT NOT NULL,
    GID INT NOT NULL,
    PRIMARY KEY (MemberID)
);

CREATE TABLE    Trainer
(
    TrainerID INT NOT NULL,
    TName VARCHAR(50) NOT NULL,
    TPhNo VARCHAR(10) NOT NULL,
    TSalary INT NOT NULL,
    PRIMARY KEY (TrainerID)
);

CREATE TABLE    WPlan
(
    TID INT NOT NULL,
    MID INT NOT NULL,
    Duration INT,
    MGroup VARCHAR(20),
    WSAP INT,
    PRIMARY KEY (MID)

);

CREATE TABLE    SNP
(
    SAP INT NOT NULL,
    Sts INT,
    Reps INT,
    PRIMARY KEY (SAP)
);

CREATE Table    DPlan
(
    MID INT NOT NULL,
    DType VARCHAR(50) NOT NULL,
    Calories INT NOT NULL,
    NutrId INT NOT NULL,
    PRIMARY KEY (MID, DType, Calories)
);

CREATE TABLE    Nutritionist
(
    NId INT NOT NULL,
    NName VARCHAR(50) NOT NULL,
    NIncome INT NOT NULL,
    NVD VARCHAR(15),
    GID INT NOT NULL,
    PRIMARY KEY (NId)
);

CREATE TABLE    ADM
(
    AId INT NOT NULL,
    AName VARCHAR(50) NOT NULL,
    AEmail VARCHAR(50),
    APhNo VARCHAR(10) NOT NULL,
    GID INT NOT NULL,
    PRIMARY KEY (AId)
);

CREATE TABLE Payment
(
    PId INT NOT NULL,
    PMode VARCHAR(10) NOT NULL,
    GSTNo CHAR(15),
    MID INT NOT NULL,
    Amount INT,
    AdmID INT NOT NULL,
    PRIMARY KEY (PId)
);

CREATE TABLE    Equipment
(
    EName VARCHAR(20) NOT NULL,
    EType VARCHAR(20) NOT NULL,
    EWeightDen INT NOT NULL,
    GID INT NOT NULL,
    PRIMARY KEY (EName, EWeightDen, GID)
);

CREATE TABLE    Gym
(
    GymId INT NOT NULL,
    GName VARCHAR(50) NOT NULL,
    GRating INT,
    GLoc VARCHAR(100) NOT NULL,
    PRIMARY KEY (GymId)
);

ALTER TABLE Member ADD CONSTRAINT fk_member_tid FOREIGN KEY(TID) REFERENCES Trainer(TrainerID);
ALTER TABLE Member ADD CONSTRAINT fk_member_nutrid FOREIGN KEY(NutrID) REFERENCES Nutritionist(NId);
ALTER TABLE Member ADD CONSTRAINT fk_member_gid FOREIGN KEY(GID) REFERENCES GYM(GymId);

ALTER TABLE WPlan ADD CONSTRAINT fk_wplan_mid FOREIGN KEY(MID) REFERENCES Member(MemberID);
ALTER TABLE WPlan ADD CONSTRAINT fk_wplan_tid FOREIGN KEY(TID) REFERENCES Trainer(TrainerID);
ALTER TABLE WPlan ADD CONSTRAINT fk_wplan_sap FOREIGN KEY (WSAP) REFERENCES SNP(SAP);

ALTER TABLE DPlan ADD CONSTRAINT fk_dplan_mid FOREIGN KEY(MID) REFERENCES Member(MemberID);
ALTER TABLE DPlan ADD CONSTRAINT fk_dplan_nutrid FOREIGN KEY(NutrID) REFERENCES Nutritionist(NId);

ALTER TABLE Nutritionist ADD CONSTRAINT fk_nutritionist_gid FOREIGN KEY(GID) REFERENCES GYM(GymId);

ALTER TABLE ADM ADD CONSTRAINT fk_adm_gid FOREIGN KEY(GID) REFERENCES GYM(GymId);

ALTER TABLE Payment ADD CONSTRAINT fk_payment_mid FOREIGN KEY(MID) REFERENCES Member(MemberID);
ALTER TABLE Payment ADD CONSTRAINT fk_payment_admin FOREIGN KEY(AdmID) REFERENCES ADM(AId);

ALTER TABLE Equipment ADD CONSTRAINT fk_equipment_gid FOREIGN KEY(GID) REFERENCES Gym(GymId);


