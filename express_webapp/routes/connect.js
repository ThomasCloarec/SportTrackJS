const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;
const bcrypt = require('bcrypt');

const admins = ["admin@sporttrack.fr"]

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
    if (req.body.page === 'user_connect') {
        if (req.body.email && req.body.pwd) {
            user_dao.findByKey(req.body.email, function (err, rows) {
                if (err) {
                    sess.error = err;
                    sess.return = '/connect';
                    res.redirect('/error');
                } else if (rows) {
                    if (bcrypt.compareSync(req.body.pwd, rows.pwd)) {
                        sess.connected_user = req.body.email
                        if (admins.includes(req.body.email)) {
                            sess.admin = rows.email
                        }
                        res.render('connectValidation', {connected_user: sess.connected_user});

                    } else {
                        sess.error = 'Adresse mail ou mot de passe incorrect.';
                        sess.return = '/connect';
                        res.redirect('/error');
                    }
                } else {
                    sess.error = 'Adresse mail ou mot de passe incorrect.';
                    sess.return = '/connect';
                    res.redirect('/error');
                }
            })
        } else {
            sess.error = 'Un ou plusieurs champs n\'ont pas été remplis correctement.';
            sess.return = '/connect';
            res.redirect('/error');
        }
    } else if (req.body.page === '/') {
        res.redirect('/');
    }
});

module.exports = router;
