DROP TABLE ActivityEntry;
DROP TABLE Activity;
DROP TABLE Sportsman;

CREATE TABLE Sportsman
(
    email     VARCHAR(50)
        CONSTRAINT pk_email PRIMARY KEY,
    firstName VARCHAR2(30),
    lastName  VARCHAR2(30),
    birthday  date,
    gender    VARCHAR(50),
    height    double
        CONSTRAINT ck_height CHECK (height > 0),
    weight    double
        CONSTRAINT ck_weight CHECK (weight > 0),
    pwd       VARCHAR2(50) not null
);

CREATE TABLE Activity
(
    idActivity    integer
        CONSTRAINT pk_fileName PRIMARY KEY AUTOINCREMENT,
    sportsman     VARCHAR2(50) NOT NULL,
    day           date,
    description   VARCHAR2(50),
    maxFrequency  double,
    minFrequency  double,
    avgFrequency  double,
    beginning     time,
    ending        time,
    totalTime     time,
    totalDistance double,
    CONSTRAINT fk_sportsman FOREIGN KEY (sportsman) REFERENCES Sportsman (email)
);

CREATE TABLE ActivityEntry
(
    idActivityEntry integer
        CONSTRAINT pk_idActivityEntry PRIMARY KEY AUTOINCREMENT,
    activity        integer NOT NULL,
    timeD           time,
    cardioFrequency double,
    latitude        double,
    longitude       double,
    altitude        double,
    CONSTRAINT fk_activity FOREIGN KEY (activity) REFERENCES Activity (idActivity)
);

CREATE TRIGGER ActivityStats
    AFTER INSERT
    ON ActivityEntry
    FOR EACH ROW
BEGIN
    UPDATE Activity
    SET maxFrequency = (SELECT MAX(cardioFrequency)
                        FROM ActivityEntry
                        WHERE activity = Activity.idActivity),

        minFrequency = (SELECT MIN(cardioFrequency)
                        FROM ActivityEntry
                        WHERE activity = Activity.idActivity),

        avgFrequency = (SELECT AVG(cardioFrequency)
                        FROM ActivityEntry
                        WHERE activity = Activity.idActivity),

        beginning    = (SELECT MIN(timeD)
                        FROM ActivityEntry
                        WHERE activity = Activity.idActivity),

        ending       = (SELECT MAX(timeD)
                        FROM ActivityEntry
                        WHERE activity = Activity.idActivity),

        totalTime    = (SELECT MAX(timeD) - MIN(timeD)
                        FROM ActivityEntry
                        WHERE activity = Activity.idActivity);
END;


--INSERT INTO Sportsman VALUES("doe.e3141592@etud.univ-ubs.fr", "John", "Doe", "01/01/1970", "Hermaphrodite", 180, 70, "haveibeenpwned.com");

--INSERT INTO Activity VALUES(1,"a@gmail.com", "01/09/2018", "IUT -> RU", null, null, null, null, null, null, null);

--INSERT INTO ActivityEntry VALUES(1,1,"13:00:00", 99, 47.644795, -2.776605, 18);
--INSERT INTO ActivityEntry VALUES(2,1,"13:00:05", 100, 47.646870, -2.778911, 18);
--INSERT INTO ActivityEntry VALUES(3,1,"13:00:10", 102, 47.646197, -2.780220, 18);
