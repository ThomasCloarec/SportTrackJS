var express = require('express');
var router = express.Router();
const user_dao = require("../../sport-track-db/sport-track-db.js").user_dao;

/* GET home page. */
router.get('/', function (req, res, next) {
    user_dao.findAllSortByTotalDistance((errors, users) => {
        res.render('index', {title: 'SportTrack', connected_user: req.session.connected_user, admin: req.session.admin, users: users});
    })
});

router.post('/', function (req, res, next) {
    if (req.body.page ==="user_disconnect") {
        req.session.connected_user = null
        req.session.admin = null
        res.redirect("/")
    }
});


module.exports = router;
