const db = require('./sqlite_connection');
const activity_entry_dao = require("./activity_entry_dao");

const ActivityDAO = function () {

    /**
     * This method allows to insert a new Activity from its object
     *
     * @param values - The values to insert
     * @param callback - The callback function
     */

    this.insert = function (values, callback) {
        db.run("INSERT OR IGNORE INTO Activity (sportsman, day, description, totalDistance) VALUES (?, ?, ?, ?)",
            [
                values.sportsman,
                values.date,
                values.description,
                values.totalDistance
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
     * This method allows to update an activity from its object
     *
     * @param key - The id of the activity to update
     * @param values - The values to update
     * @param callback - The callback function
     */

    this.update = function (key, values, callback) {
        db.run("UPDATE Activity SET sportsman = ?, day = ?, description = ?, totalDistance = ? where idActivity = ?",
            [
                values.sportsman,
                values.date,
                values.description,
                values.totalDistance,
                key
            ],
            callback
        );
    };

    /**
     * This method allows to delete an Activity
     *
     * @param key - The id of the activity to delete
     * @param callback - The callback function
     */

    this.delete = function (key, callback) {
        db.run("DELETE FROM Activity WHERE idActivity = ?",
            [
                key
            ],
            callback
        );
    };

    /**
     * This method allows to get all information of all activities
     *
     * @return array
     */

    this.findAll = function (callback) {
        db.all("SELECT * FROM Activity", callback);
    };

    /**
     * This method allows to get all information of all activities of a sportsman
     *
     * @param string key - The email of sportsman
     * @return array
     */

    this.findAllFromSportsman = function (key, callback) {
        db.all("SELECT * FROM Activity WHERE sportsman = ?",
            [
                key
            ],
            callback
        );
    };

    this.findByKey = function (key, callback) {
        db.get("SELECT * FROM Activity WHERE idActivity = ?",
            [
                key
            ],
            callback
        );
    };

    this.findByKeyWithEntries = function (key, callback) {
        this.findByKey(key, function (activity_err, activity) {
            if (activity_err !== null) {
                console.log("ERROR= " + activity_err);
            } else {
                activity_entry_dao.findAll(function (activity_entry_err, activity_entry_rows) {
                    if (activity_entry_err !== null) {
                        console.log("ERROR= " + activity_entry_err);
                    } else {
                        activity.entries = []
                        activity_entry_rows.forEach((activity_entry) => {
                            if (activity_entry.activity === activity.idActivity) {
                                activity.entries.push(activity_entry)
                            }
                        })
                        callback(activity_entry_err, activity)
                    }
                })
            }
        });
    }
};

let dao = new ActivityDAO();
module.exports = dao;