const db = require('./sqlite_connection');

const ActivityEntryDAO = function () {
    this.insert = function (values, callback) {
        db.run("INSERT OR IGNORE INTO ActivityEntry(activity, timeD, cardioFrequency, latitude, longitude, altitude) values (?, ?, ?, ?, ?, ?)",
            [
                values.activity,
                values.timeD,
                values.cardioFrequency,
                values.latitude,
                values.longitude,
                values.altitude
            ],
            callback
        );
    };

    this.update = function (key, values, callback) {
        db.run("update ActivityEntry set activity = ?, timeD = ?, cardioFrequency = :?, latitude = ?, longitude = ?, altitude = ? where idActivtyEntry = ?",
            [
                values.activity,
                values.timeD,
                values.cardioFrequency,
                values.latitude,
                values.longitude,
                values.altitude,
                key
            ],
            callback
        );
    };

    this.deleteAll = function (callback) {
        db.run("DELETE FROM ActivityEntry", callback);
    }

    this.deleteFromActivity = function (key, callback) {
        db.run("DELETE FROM ActivityEntry WHERE activity = ?",
            [
                key
            ],
            callback
        );
    };

    this.findAll = function (callback) {
        db.run("SELECT * FROM ActivityEntry", callback);
    };

    this.findByKey = function (key, callback) {
        db.run("SELECT * FROM ACtivityEntry WHERE activity = ?",
            [
                key
            ],
            callback
        );
    };
};

let dao = new ActivityEntryDAO();
module.exports = dao;