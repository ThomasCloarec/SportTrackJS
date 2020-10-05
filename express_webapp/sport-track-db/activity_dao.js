const db = require('./sqlite_connection');

const ActivityDAO = function () {
    this.insert = function (values, callback) {
        db.run("INSERT INTO Activity(sportsman, day, description, totalDistance) VALUES (?, ?, ?, ?)",
            [
                values.sportsman,
                values.day,
                values.description,
                values.totaleDistance
            ],
            callback
        );
    };

    this.update = function (key, values, callback) {
        db.run("UPDATE Activity SET sportsman = ?, day = ?, description = ? where idActivity = ?",
            [
                values.sportsman,
                values.day,
                values.description,
                key
            ],
            callback
        );
    };

    this.deleteAll = function (callback) {
        db.run("DELETE FROM Activity");
    }

    this.delete = function (key, callback) {
        db.run("DELETE FROM Activity WHERE idActivity = ?",
            [
                key
            ],
            callback
        );
    };

    this.deleteFromSportsman = function (key, callback) {
        db.run("DELETE FROM ACtivity WHERE sportsman = ?",
            [
                key
            ],
            callback
        );
    };

    this.findAll = function (callback) {
        db.run("SELECT * FROM Activity", callback);
    };

    this.findAllFromSportsman = function (key, callback) {
        db.run("SELECT * FROM Activity WHERE sportsman = ?",
            [
                key
            ],
            callback
        );
    };

    this.findDistanceSumFromDistance = function (key, callback) {
        db.run("SELECT SUM(totalDistance) FROM Activity WHERE sportsman = ?",
            [
                key
            ],
            callback
        );
    };

    this.findByKey = function (key, callback) {
        db.run("SELECT * FROM Activity WHERE idACtivity = ?",
            [
                key
            ],
            callback
        );
    };
};

let dao = new ActivityDAO();
module.exports = dao;