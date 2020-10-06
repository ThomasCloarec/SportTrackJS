var express = require('express');
var router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;

/* GET home page. */
router.get('/', function (req, res, next) {
    user_dao.findAll((errors, users) => {
        res.render('index', {title: 'SportTrack', connected_user: req.connected_user, admin: req.admin, users: [...users]});
    })
});

router.post('/', function (req, res, next) {
    if (req.body.page === 'user_add_form') {
        res.redirect("/users")
    } else if (req.body.page === 'user_connect_form') {
        res.redirect("/connect")
    }
});


module.exports = router;
