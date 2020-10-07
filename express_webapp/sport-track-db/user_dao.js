const db = require('./sqlite_connection');

const UserDAO = function () {
    this.update = function (key, values, callback) {
        db.run("UPDATE Sportsman SET email = ?, firstName = ?, lastName = ?, birthday = ?, gender = ?, height = ?, weight = ?, pwd = ? WHERE email = ?",
            [
                values.email,
                values.firstName,
                values.lastName,
                values.birthday,
                values.gender,
                values.height,
                values.weight,
                values.pwd,
                key
            ],
            callback
        );
    };

    this.deleteAll = function (callback) {
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
                values.pwd
            ],
            callback
        );
    };
};

let dao = new UserDAO();
module.exports = dao;