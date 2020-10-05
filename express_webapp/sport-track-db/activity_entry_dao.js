const db = require('./sqlite_connection');

const ActivityEntryDAO = function () {
    this.insert = function (values, callback) {
        db.run("INSERT INTO ActivityEntry(activity, timeD, cardioFrequency, latitude, longitude, altitude) values (?, ?, ?, ?, ?, ?)",
            [
                values.activity,
                values.timeD,
                values.cardioFrequency,
                values.latitude,
                values.longitude,
                values.altitude
            ]);
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
            ]);
    };

    this.deleteAll = function (callback) {
        db.run("DELETE FROM ActivityEntry");
    }

    this.deleteFromActivity = function (key, callback) {
        db.run("DELETE FROM ActivityEntry WHERE activity = ?",
            [
                key
            ]
        );
    };

    this.findAll = function (callback) {
        db.run("SELECT * FROM ActivityEntry");
    };

    this.findByKey = function (key, callback) {
        db.run("SELECT * FROM ACtivityEntry WHERE activity = ?",
            [
                key
            ]);
    };
};

let dao = new ActivityEntryDAO();
module.exports = dao;