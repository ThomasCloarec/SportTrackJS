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

    sess = req.session;

    if (req.body.page === 'user_add') {

        if (req.body.email && req.body.lastName && req.body.firstName && req.body.birthday && req.body.gender && req.body.height && req.body.weight && req.body.pwd) {

            user_dao.findByKey(req.body.email, function (err, rows) {

                if (err) {
                    sess.error = err;
                    sess.return = '/users';
                    res.redirect('/error');
                } else if (rows) {
                    sess.error = 'Cette adresse email est déjà renseignée.';
                    sess.return = '/users';
                    res.redirect('/error');
                } else {

                    user_dao.insert(req.body)
                    sess.connected_user = req.body.email;
                    res.render('connectValidation', {connected_user: sess.connected_user});

                }

            })

        } else {

            sess.error = 'Un ou plusieurs champs sont incomplets';
            sess.return = '/users';
            res.redirect('/error');

        }

    }
});

module.exports = router;
