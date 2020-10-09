const db = require('./sqlite_connection');

const ActivityEntryDAO = function () {
    this.insert = function (values, callback) {
        db.run("INSERT OR IGNORE INTO ActivityEntry(activity, timeD, cardioFrequency, latitude, longitude, altitude) values (?, ?, ?, ?, ?, ?)",
            [
                values.activity,
                values.time,
                values.cardio_frequency,
                values.latitude,
                values.longitude,
                values.altitude
            ],
            function (err) {
                if (null == err) {
                    callback(err, this.lastID);
                } else {
                    console.log(err);
                }
            }
        );
    };

    this.insertAll = function (rows_values, callback) {
        let sql = "INSERT OR IGNORE INTO ActivityEntry(activity, timeD, cardioFrequency, latitude, longitude, altitude) values";
        let values = []

        rows_values.forEach((value, index) => {
            sql = sql + " (?, ?, ?, ?, ?, ?)";
            if (index !== rows_values.length - 1) {
                sql = sql + ","
            }
            values = values.concat([value.activity, value.time, value.cardio_frequency, value.latitude, value.longitude, value.altitude])
        })

        db.run(sql, values,
            function (err) {
                if (null == err) {
                    callback(err, "Done");
                } else {
                    console.log(err);
                }
            }
        );
    };

    this.update = function (key, values, callback) {
        db.run("update ActivityEntry set activity = ?, timeD = ?, cardioFrequency = :?, latitude = ?, longitude = ?, altitude = ? where idActivtyEntry = ?",
            [
                values.activity,
                values.time,
                values.cardio_frequency,
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
        db.run("DELETE FROM Activity", callback);
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
        db.all("SELECT * FROM ActivityEntry", callback);
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