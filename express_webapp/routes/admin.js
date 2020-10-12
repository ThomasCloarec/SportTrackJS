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

                sess.error = err;
                sess.return = '/';
                res.redirect('/error');

            } else if (rows) {

                user_dao.findAllWithDistanceEqualZero(function (errWithDistanceEqualZero, rowsWithDistanceEqualZero) {

                    if (errWithDistanceEqualZero) {

                        sess.error = errWithDistanceEqualZero;
                        sess.return = '/';
                        res.redirect('/error');

                    } else if (rowsWithDistanceEqualZero) {

                        res.render('admin', {data: rows, dataWithZero: rowsWithDistanceEqualZero})

                    } else {

                        sess.error = 'Impossible de retrouver la liste de comptes';
                        sess.return = '/';
                        res.redirect('/error');

                    }

                })

            } else {

                sess.error = 'Impossible de retrouver la liste de comptes';
                sess.return = '/';
                res.redirect('/error');

            }

        });

    } else {

        sess.error = 'Vous n\'êtes pas autorisé à naviguer ici';
        sess.return = '/';
        res.redirect('/error');

    }

});

router.post('/', function (req, res, next) {

    if (req.body.resetAccount) {

        let email = req.body.resetAccount;

        activity_dao.findAllFromSportsman(email, function (err, rows) {

            if(err) {

                sess.error = err;
                sess.return = '/';
                res.redirect('/error');

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

                sess.error = err;
                sess.return = '/';
                res.redirect('/error');

            } else if (rows) {

                for (let r in rows) {
                    activity_entry_dao.deleteFromActivity(rows[r].idActivity);
                    activity_dao.delete(rows[r].idActivity);
                }

            } else {

                sess.error = 'Impossible de supprimer le compte : compte non trouvé';
                sess.return = '/';
                res.redirect('/error');

            }

        });

        user_dao.delete(email);

    }

    res.render('actionAdminValidation');

});

module.exports = router;
