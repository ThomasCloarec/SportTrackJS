const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    sess = req.session;
    res.render('error', {
        err: sess.error,
        ret: sess.return
    })
});

module.exports = router;
