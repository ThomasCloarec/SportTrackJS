const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;
const activity_dao = require("../sport-track-db/sport-track-db.js").activity_dao;
const activity_entry_dao = require("../sport-track-db/sport-track-db.js").activity_entry_dao;

router.get('/', function (req, res, next) {

    sess = req.session;

    if (sess.admin) {

        user_dao.findAllSortByTotalDistance(function(err, rows) {

            if(err) {

                res.render('error', {
                    err: err,
                    ret: '/'
                });

            } else if (rows) {

                user_dao.findAllWithDistanceEqualZero(function (errWithDistanceEqualZero, rowsWithDistanceEqualZero) {

                    if (errWithDistanceEqualZero) {

                        res.render('error', {
                            err: errWithDistanceEqualZero,
                            ret: '/'
                        });

                    } else if (rowsWithDistanceEqualZero) {

                        res.render('admin', {data: rows, dataWithZero: rowsWithDistanceEqualZero})

                    } else {

                        res.render('error', {
                            err: 'Impossible de retrouver la liste de comptes',
                            ret: '/'
                        });

                    }

                })

            } else {

                res.render('error', {
                    err: 'Impossible de retrouver la liste de comptes',
                    ret: '/'
                });

            }

        });

    } else {

        res.render('error', {
            err: 'Vous n\'êtes pas autorisé à naviguer ici',
            ret: '/'
        });

    }

});

router.post('/', function (req, res, next) {

    if (req.body.resetAccount) {

        let email = req.body.resetAccount;

        activity_dao.findAllFromSportsman(email, function (err, rows) {

            if(err) {

                res.render('error', {
                    err: err,
                    ret: '/'
                });

            } else if (rows) {

                if (rows.length > 0) {
                    for (let r in rows) {
                        activity_entry_dao.deleteFromActivity(rows[r].idActivity);
                        activity_dao.delete(rows[r].idActivity);
                    }
                }

            }

        });

    } else if (req.body.deleteAccount) {

        let email = req.body.deleteAccount;

        activity_dao.findAllFromSportsman(email, function (err, rows) {

            if(err) {

                res.render('error', {
                    err: err,
                    ret: '/'
                });

            } else if (rows) {

                for (let r in rows) {
                    activity_entry_dao.deleteFromActivity(rows[r].idActivity);
                    activity_dao.delete(rows[r].idActivity);
                }

            } else {

                res.render('error', {
                    err: 'Impossible de supprimer le compte : compte non trouvé',
                    ret: '/'
                });

            }

        });

        user_dao.delete(email);

    }

    res.render('actionAdminValidation');

});

module.exports = router;
