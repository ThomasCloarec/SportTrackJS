const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;

router.get('/', function (req, res, next) {
        user_dao.findAll(function (err, rows) {
        if (err !== null) {
            console.log("ERROR= " + err);
        } else {
            res.render('users', {data: rows});
        }
    });
});

router.post('/', function (req, res, next) {

    if (req.body.page === 'user_add' && req.body.email !== "") {

        sess = req.session;

        user_dao.findByKey(email, function (err, rows) {

            if (err) {
                sess.error = err;
                sess.return = '/users';
                res.redirect('/error');
            } else if (rows) {
                sess.error = 'Cette adresse email est déjà renseignée.';
                sess.return = '/users';
                res.redirect('/error');
            } else {

                if (req.body.lastName && req.body.firstName && req.body.birthday && req.body.gender && req.body.height && req.body.weight && req.body.pwd) {

                    user_dao.insert(req.body)

                } else {

                    sess.error = 'Un ou plusieurs champs n\'ont pas été remplis correctement';
                    sess.return = '/users';
                    res.redirect('/error');

                }

            }

        })
    }

    user_dao.findAll(function (err, rows) {
        if (err != null) {
            console.log("ERROR= " + err);
        } else {
            res.render('users', {data: rows});
        }
    });

    if (req.body.page === '/') {
        res.redirect('/');
    }
});

module.exports = router;
