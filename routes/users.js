var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var sql='select * from users';
    db.get().query(sql, function(err, rows){
        res.send(rows);
    });
});

module.exports = router;
