const express = require('express');
const router = express.Router();
const activity_dao = require("../sport-track-db/sport-track-db.js").activity_dao;
const activity_entry_dao = require("../sport-track-db/sport-track-db.js").activity_entry_dao;


router.get('/', function (req, res, next) {
    activity_dao.findAll(function (activity_err, activity_rows) {
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
                                activity.entries.add(activity_entry)
                            }
                        })
                    })
                    console.log(activity_rows)
                    res.render('activities', {data: activity_rows});
                }
            })
        }
    });
});

router.post('/', function (req, res, next) {
    activity_dao.findAll(function (activity_err, activity_rows) {
        if (activity_err !== null) {
            console.log("ERROR= " + activity_err);
        } else {
            activity_entry_dao.findAll(function (activity_entry_err, activity_entry_rows) {
                if (activity_entry_err !== null) {
                    console.log("ERROR= " + activity_entry_err);
                } else {
                    res.render('users', {data: activity_entry_rows});
                }
            })
        }
    });
});

module.exports = router;
