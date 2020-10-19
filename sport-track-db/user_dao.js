const db = require('./sqlite_connection');
const bcrypt = require('bcrypt');

const UserDAO = function () {

    /**
     * This method allows to update a sportsman from its object
     *
     * @param key - The email of the sportsman to update
     * @param values - The values to update
     * @param callback - The callback function
     */

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
            function (err) {
                if (!values.pwd && callback) {
                    if (err) {
                        callback(false)
                    } else {
                        callback(true)
                    }
                }
            }
        );

        if (values.pwd) {
            db.run("UPDATE Sportsman SET pwd = ? WHERE email = ?",
                [
                    bcrypt.hashSync(values.pwd, 10),
                    key
                ],
                function (err) {
                    if (callback) {
                        if (err) {
                            callback(false)
                        } else {
                            callback(true)
                        }
                    }
                }
            );
        }
    };

    /**
     * This method allows to delete a Sportsman
     *
     * @param key - The email of the sportsman to delete
     * @callback - The callback function
     */

    this.delete = function (key, callback) {
        db.run("DELETE FROM Sportsman WHERE email = ?",
            [
                key
            ],
            function (err) {
                if (callback) {
                    if (err) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                }
            });
    };

    /**
     * This method allows to get all information of all Sportsman
     *
     * @param callback - The callback function
     * @return array
     */

    this.findAll = function (callback) {
        db.all("SELECT * FROM Sportsman", callback);
    };

    /**
     * This method allows to get all information of all Sportsman sort by the total distance when its not equal to zero
     *
     * @param callback - The callback function
     * @return array
     */

    this.findAllSortByTotalDistance = function (callback) {
        db.all("select email, firstName, lastName, SUM(totalDistance) as totalDistance from Sportsman, Activity where sportsman = email group by email, firstName, lastName order by SUM(totalDistance) desc", callback);
    };

    /**
     * This method allows to get all information of all Sportsman sort by the total distance when its equal to zero
     *
     * @param callback - The callback function
     * @return array
     */

    this.findAllWithDistanceEqualZero = function (callback) {
        db.all("select email, firstName, lastName from Sportsman where email not in (select sportsman as email from Activity) group by email, firstName, lastName", callback);
    };

    /**
     * This method allows to get all information of a Sportsman
     *
     * @param key - The email of the sportsman
     * @param callback - The callback function
     * @return array
     */

    this.findByKey = function (key, callback) {
        db.get("SELECT * FROM Sportsman WHERE email = ?",
            [
                key
            ],
            callback);
    };

    /**
     * This method allows to insert a new Sportsman from its object
     *
     * @param values - The values to insert
     * @param callback - The callback function
     * @return int
     */

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