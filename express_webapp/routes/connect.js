const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;

router.get('/', function (req, res, next) {
    user_dao.findAll(function (err, rows) {
        if (err !== null) {
            console.log("ERROR= " + err);
        } else {
            res.render('connect');
        }
    });
});

router.post('/', function (req, res, next) {

    sess = req.session;

    if (req.body.page === 'user_connect' && req.body.email !== '') {

        user_dao.findByKey(req.body.email, function (err, rows) {

            if (err !== null) {

                sess.error = err;
                sess.return = '/connect';
                req.redirect('/error');

            } else if (rows !== undefined) {

                if (rows.pwd === req.body.pwd) {

                    res.render('connectValidation');

                } else {

                    sess.error = 'Adresse mail ou mot de passe incorrect';
                    sess.return = '/connect';
                    req.redirect('/error');

                }

            } else {

                sess.error = 'Adresse mail ou mot de passe incorrect';
                sess.return = '/connect';
                req.redirect('/error');

            }

        })

    }

    if (req.body.page === '/') {
        res.redirect('/');
    }

});

module.exports = router;
