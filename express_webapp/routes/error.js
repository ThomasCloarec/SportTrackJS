const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {

    sess = req.session;

    res.render('error', {
        data: sess.error
    })

});

router.post('/', function (req, res, next) {

    res.redirect(req.body.page);

});

module.exports = router;
