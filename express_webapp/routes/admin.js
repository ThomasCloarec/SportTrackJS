const express = require('express');
const router = express.Router();
const user_dao = require("../sport-track-db/sport-track-db.js").user_dao;

router.get('/', function (req, res, next) {

    sess = req.session;

    if (sess.admin) {

        user_dao.findAll(function(err, rows) {
            if(err) {
                sess.error = err;
                sess.return = '/';
                res.redirect('/error');
            } else if (rows) {
                res.render('admin', {data: rows})
            } else {
                sess.error = 'Impossible de retrouver la liste de comptes';
                sess.return = '/';
                res.redirect('/error');
            }
        });

    } else {

        sess.error = 'Vous n\'êtes pas autorisé à naviguer ici';
        sess.return = '/';
        res.redirect('/error');

    }

});

router.post('/', function (req, res, next) {

    if (req.body.page === 'user_add' && req.body.email !== "") {
        user_dao.insert(req.body)
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
