const db = require('./sqlite_connection');
const activity_entry_dao = require("./activity_entry_dao");

const ActivityDAO = function () {
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

    this.deleteAll = function (callback) {
        db.run("DELETE FROM ActivityEntry", callback);
        db.run("DELETE FROM Activity", callback);
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
        db.all("SELECT * FROM Activity", callback);
    };

    this.findAllWithEntries = function(callback) {
        this.findAll(function (activity_err, activity_rows) {
            if (activity_err !== null) {
                console.log("ERROR= " + activity_err);
            } else {
                activity_entry_dao.findAll(function (activity_entry_err, activity_entry_rows) {
                    if (activity_entry_err !== null) {
                        console.log("ERROR= " + activity_entry_err);
                    } else {
                        activity_rows.forEach((activity) => {
                            activity.entries = []
                            activity_entry_rows.forEach((activity_entry) => {
                                if (activity_entry.activity === activity.idActivity) {
                                    activity.entries.push(activity_entry)
                                }
                            })
                        })
                        callback(activity_entry_err, activity_rows)
                    }
                })
            }
        });
    }

    this.findAllFromSportsman = function (key, callback) {
        db.all("SELECT * FROM Activity WHERE sportsman = ?",
            [
                key
            ],
            callback
        );
    };

    this.findDistanceSumFromDistance = function (key, callback) {
        db.get("SELECT SUM(totalDistance) FROM Activity WHERE sportsman = ?",
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