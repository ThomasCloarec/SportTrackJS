const db = require('./sqlite_connection');

const ActivityEntryDAO = function () {

    /**
     * This method allows to insert a new ActivityEntry from its object
     *
     * @param values - The values to insert
     */

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

    /**
     * This unction allows to insert multiple rows into the database
     *
     * @param rows_values - All the rows to insert
     * @param callback - The callback function
     */

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

    /**
     * This method allows to update an ActivityEntry from its object
     *
     * @param key - The id of the activity entry to update
     * @param values - The values to update
     * @param - callback
     */

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

    /**
     * This method allows to delete all activity entries from an activity
     *
     * @param key - The activity entry to delete
     * @parama callback - The callback function
     */

    this.deleteFromActivity = function (key, callback) {
        db.run("DELETE FROM ActivityEntry WHERE activity = ?",
            [
                key
            ],
            callback
        );
    };

    /**
     * This method allows to get all information of all activities entry
     *
     * @param callback - The callback function
     * @return array
     */

    this.findAll = function (callback) {
        db.all("SELECT * FROM ActivityEntry", callback);
    };

    /**
     * This method allows to get all information of all activities entry of an activity
     *
     * @param key - The id of the activity
     * @return array
     */

    this.findByKey = function (key, callback) {
        db.all("SELECT * FROM ActivityEntry WHERE activity = ?",
            [
                key
            ],
            callback
        );
    };
};

let dao = new ActivityEntryDAO();
module.exports = dao;