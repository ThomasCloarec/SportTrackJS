const express = require('express');
const router = express.Router();
const activity_dao = require("../sport-track-db/sport-track-db.js").activity_dao;
const activity_entry_dao = require("../sport-track-db/sport-track-db.js").activity_entry_dao;
const calculatePathDistance = require("./fonctions").calculatePathDistance;

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

router.get('/', function (req, res, next) {
    if (req.session.connected_user) {
        activity_dao.findAllFromSportsman(req.session.connected_user, function (activity_err, activity_rows) {
            if (activity_err !== null) {
                console.log("ERROR= " + activity_err);
            } else {
                res.render('activities', {data: activity_rows});
            }
        });
    } else {
        req.session.error = 'Accès interdit, veuillez vous connecter.';
        req.session.return = '/';
        res.redirect('/error');
    }
});

router.post('/', function (req, res, next) {
    if (req.session.connected_user) {
        if (req.body.page === "delete_activity") {
            activity_entry_dao.deleteFromActivity(req.body['activity-id'], null)
            activity_dao.delete(req.body['activity-id'], null);
            res.redirect('/activities')
        } else if (req.body.page === "activity_details") {
            activity_dao.findByKeyWithEntries(req.body["activity-id"], (error, value) => {
                res.render("activity_entries", {activity: value})
            })
        } else if (req.body.page === "list_activities") {
            res.redirect('/activities')
        } else if (req.body.page === '/') {
            res.redirect('/');
        } else {
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

                    obj.activity.sportsman = req.session.connected_user

                    obj.activity.totalDistance = calculatePathDistance(obj)
                    activity_dao.insert(obj.activity, (error, idActivity) => {
                        obj.data.forEach((value) => {
                            value.activity = idActivity
                        })

                        activity_entry_dao.insertAll(obj.data, (error, value) => {
                            activity_dao.findAllFromSportsman(req.session.connected_user, function (activity_err, activity_rows) {
                                if (activity_err !== null) {
                                    console.log("ERROR= " + activity_err);
                                } else {
                                    res.render('activities', {data: activity_rows});
                                }
                            });
                        })
                    })
                });
            });
        }
    } else {
        req.session.error = 'Accès interdit, veuillez vous connecter.';
        req.session.return = '/';
        res.redirect('/error');
    }
});

module.exports = router;
