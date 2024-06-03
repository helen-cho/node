var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//장바구니등록
router.post('/insert', function(req, res){
  const uid=req.body.uid;
  const bid=req.body.bid;
  const sql='insert into cart(uid, bid) values(?,?)';
  db.get().query(sql, [uid, bid], function(err, rows){
    if(err){
      res.send({result:0});
    }else{
      res.send({result:1});
    }
  });
});

module.exports = router;