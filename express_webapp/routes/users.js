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

            add = true;

            if (!new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$").test(req.body.email)) {
                add = false;
                sess.message = "L'adresse email saisie n'est pas au bon format.";
            } else if (!new RegExp("^[a-zA-Z-]{1,30}$").test(req.body.firstName) || !new RegExp("^[a-zA-Z-]{1,30}$").test(req.body.lastName)) {
                add = false;
                sess.message = "Les noms et prénoms ne peuvent contenir que des lettres minuscules et majuscules, non accentuées, ainsi que des tirets.";
            } else if (!new RegExp("^\\S*(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*[\\d])\\S*$").test(req.body.pwd) || req.body.pwd.length < 6) {
                add = false;
                sess.message = "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et doit avoir une longueur minimale de 6 charactères.";
            } else if (!new RegExp("^[a-zA-Z]{1,50}$").test(req.body.gender)) {
                add = false;
                sess.message = "Le genre ne peut contenir que des lettres minuscules et majuscules, non accentuées.";
            }

            if (!add) {

                sess.return = '/users';
                res.redirect('/error');

            } else {

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

            }

        } else {

            sess.error = 'Un ou plusieurs champs sont incomplets';
            sess.return = '/users';
            res.redirect('/error');

        }

    }
});

module.exports = router;
