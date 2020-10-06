
const express = require('express');
const router = express.Router();
const activity_dao = require("../sport-track-db/sport-track-db.js").activity_dao;
const activity_entry_dao = require("../sport-track-db/sport-track-db.js").activity_entry_dao;
const calculatePathDistance = require("./fonctions").calculatePathDistance;

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

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
                                activity.entries.push(activity_entry)
                            }
                        })
                    })
                    res.render('activities', {data: activity_rows});
                }
            })
        }
    });
});

router.post('/', function (req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream(__dirname + '/img/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);

            var obj = JSON.parse(fs.readFileSync(__dirname + '/img/' + filename, 'utf8'));

            obj.activity.sportsman = "a@a.com"

            obj.activity.totalDistance = calculatePathDistance(obj)
            activity_dao.insert(obj.activity, (error, idActivity) => {
                obj.data.forEach((value) => {
                    value.activity = idActivity
                })
                console.log(obj)
                activity_entry_dao.insertAll(obj.data, (error, value) => {
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
                                                activity.entries.push(activity_entry)
                                            }
                                        })
                                    })
                                    console.log(activity_rows)
                                    console.log(activity_entry_rows)
                                    res.render('activities', {data: activity_rows});
                                }
                            })
                        }
                    });
                })
            })
        });
    });
});

module.exports = router;
