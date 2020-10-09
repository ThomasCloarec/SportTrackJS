const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;
const activity_dao = require("../sport-track-db/sport-track-db.js").activity_dao;
const activity_entry_dao = require("../sport-track-db/sport-track-db.js").activity_entry_dao;

router.get('/', function (req, res, next) {

    sess = req.session;
    console.log(sess.admin);

    if (sess.admin) {

        user_dao.findAll(function(err, rows) {

            if(err) {

                sess.error = err;
                sess.return = '/';
                res.redirect('/error');

            } else if (rows) {

                res.render('admin', {data: rows})

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

                for (let r in rows) {
                    activity_entry_dao.deleteFromActivity(r.idActivity);
                    activity_dao.delete(r.idActivity);
                }

            } else {

                sess.error = 'Impossible de réinitialiser le compte : compte non trouvé';
                sess.return = '/';
                res.redirect('/error');

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
                    activity_entry_dao.deleteFromActivity(r.idActivity);
                    activity_dao.delete(r.idActivity);
                }

            } else {

                sess.error = 'Impossible de supprimer le compte : compte non trouvé';
                sess.return = '/';
                res.redirect('/error');

            }

        });

        user_dao.delete(email);

    }

    user_dao.findAll(function(err, rows) {

        if(err) {

            sess.error = err;
            sess.return = '/';
            res.redirect('/error');

        } else if (rows) {

            res.render('admin', {data: rows})

        } else {

            sess.error = 'Impossible de retrouver la liste de comptes';
            sess.return = '/';
            res.redirect('/error');

        }

    });


});

module.exports = router;
