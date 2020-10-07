const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;

router.get('/', function (req, res, next) {
    user_dao.findByKey(req.session.connected_user, (error, value) => {
        res.render('modify', {user: value});
    })
});

router.post('/', function (req, res, next) {
    user_dao.findByKey(req.session.email, (error, value) => {
        res.render('modify', {user: value});
    })

    if (req.body.page === '/') {
        res.redirect('/');
    }
});

module.exports = router;
