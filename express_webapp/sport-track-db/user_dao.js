const db = require('./sqlite_connection');
const bcrypt = require('bcrypt');

const UserDAO = function () {
    this.update = function (key, values, callback) {
        db.run("UPDATE Sportsman SET email = ?, firstName = ?, lastName = ?, birthday = ?, gender = ?, height = ?, weight = ? WHERE email = ?",
            [
                values.email,
                values.firstName,
                values.lastName,
                values.birthday,
                values.gender,
                values.height,
                values.weight,
                key
            ],
            callback
        );

        if (values.pwd) {
            db.run("UPDATE Sportsman SET pwd = ? WHERE email = ?",
                [
                    bcrypt.hashSync(values.pwd, 10),
                    key
                ],
                callback
            );
        }
    };

    this.deleteAll = function (callback) {
        db.run("DELETE FROM ActivityEntry", callback);
        db.run("DELETE FROM Activity", callback);
        db.run("DELETE FROM Sportsman", callback);
    }

    this.delete = function (key, callback) {
        db.run("DELETE FROM Sportsman WHERE email = ?",
            [
                key
            ],
            callback);
    };

    this.findAll = function (callback) {
        db.all("SELECT * FROM Sportsman", callback);
    };

    this.findAllSortByTotalDistance = function (callback) {
        db.all("select email, firstName, lastName, SUM(totalDistance) as totalDistance from Sportsman, Activity where sportsman = email group by email, firstName, lastName order by SUM(totalDistance) desc", callback);
    };

    this.findAllWithDistanceEqualZero = function (callback) {
        db.all("select email, firstName, lastName from Sportsman where email not in (select sportsman as email from Activity) group by email, firstName, lastName", callback);
    };

    this.findByKey = function (key, callback) {
        db.get("SELECT * FROM Sportsman WHERE email = ?",
            [
                key
            ],
            callback);
    };

    this.insert = function (values, callback) {
        db.run("INSERT OR IGNORE INTO Sportsman (email, firstName, lastName, birthday, gender, height, weight, pwd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                values.email,
                values.firstName,
                values.lastName,
                values.birthday,
                values.gender,
                values.height,
                values.weight,
                bcrypt.hashSync(values.pwd, 10)
            ],
            callback
        );
    };
};

let dao = new UserDAO();
module.exports = dao;