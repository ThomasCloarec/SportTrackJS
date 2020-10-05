const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {

});

router.post('/', function (req, res, next) {

    req.redirect(req.body.page);

});

module.exports = router;
