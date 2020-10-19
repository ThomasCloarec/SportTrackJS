const express = require('express');
const router = express.Router();
const user_dao = require("sport-track-db/sport-track-db.js").user_dao;

router.get('/', function (req, res, next) {
    if (req.session.connected_user) {
        user_dao.findByKey(req.session.connected_user, (error, value) => {
            res.render('modify', {user: value});
        })
    } else {
        res.render('error', {
            err: 'Accès interdit, veuillez vous connecter.',
            ret: '/'
        });
    }
});

router.post('/', function (req, res, next) {
    if (req.session.connected_user) {
        if (req.body.page === "modify_account") {
            req.body.email = req.session.connected_user

            user_dao.update(req.session.connected_user, req.body, (success) => {
                user_dao.findByKey(req.session.connected_user, (error, value) => {
                    res.render('modify', {user: value});
                });
            })
        } else {
            user_dao.findByKey(req.session.connected_user, (error, value) => {
                res.render('modify', {user: value});
            })
        }
    } else {
        res.render('error', {
            err: 'Accès interdit, veuillez vous connecter.',
            ret: '/'
        });
    }

});

module.exports = router;
