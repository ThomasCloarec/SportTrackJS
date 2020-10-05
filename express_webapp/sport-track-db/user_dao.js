const db = require('./sqlite_connection');

const UserDAO = function () {
    this.insert = function (values, callback) {
        db.run("INSERT INTO Sportsman (email, firstName, lastName, birthday, gender, height, weight, pwd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
                values.email,
                values.firstName,
                values.lastName,
                values.birthday,
                values.gender,
                values.height,
                values.weight,
                values.pwd
            ]);
    };

    this.update = function (key, values, callback) {
        db.run("UPDATE Sportsman SET email = ?, firstName = ?, lastName = ?",
            [
                values.email,
                values.firstName,
                values.lastName
            ]);
    };

    this.deleteAll = function (callback) {
        db.run("DELETE FROM Sportsman");
    }

    this.delete = function (key, callback) {
        db.run("DELETE FROM Sportsman WHERE email = ?",
            [
                key
            ]
        );
    };

    this.findAll = function (callback) {
        db.run("SELECT * FROM Sportsman");
    };

    this.findByKey = function (key, callback) {
        db.run("SELECT * FROM Sportsman WHERE email = ?",
            [
                key
            ]);
    };
};

let dao = new UserDAO();
module.exports = dao;