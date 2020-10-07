const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;

router.get('/', function (req, res, next) {
    if (req.session.connected_user) {
        user_dao.findByKey(req.session.connected_user, (error, value) => {
            res.render('modify', {user: value});
        })
    } else {
        req.session.error = 'Accès interdit, veuillez vous connecter.';
        req.session.return = '/';
        res.redirect('/error');
    }
});

router.post('/', function (req, res, next) {
    if (req.session.connected_user) {
        if (req.body.page === "modify_account") {
            req.body.email = req.session.connected_user

            user_dao.update(req.session.connected_user, req.body, (error, value) => {
                user_dao.findByKey(req.session.connected_user, (error, value) => {
                    res.render('modify', {user: value});
                });
            })
        } else {
            user_dao.findByKey(req.session.connected_user, (error, value) => {
                res.render('modify', {user: value});
            })

            if (req.body.page === '/') {
                res.redirect('/');
            }
        }
    } else {
        req.session.error = 'Accès interdit, veuillez vous connecter.';
        req.session.return = '/';
        res.redirect('/error');
    }
});

module.exports = router;
