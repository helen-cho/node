var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//주문자정보입력
router.post('/purchase', function(req, res){
  const pid=req.body.pid;
  const uid=req.body.uid;
  const uname=req.body.uname;
  const phone=req.body.phone;
  const address1=req.body.address1;
  const address2=req.body.address2;
  const sum=req.body.sum;
  let sql="insert into purchase(pid,uid,uname,phone,address1,address2,sum)";
  sql+=" values(?,?,?,?,?,?,?)";
  db.get().query(sql,[pid,uid,uname,phone,address1,address2,sum], function(err, rows){
    if(err){
      res.send({result:0});
    }else{
      res.send({result:1});
    }
  });
})

module.exports = router;