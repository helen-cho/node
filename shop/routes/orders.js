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

//주문상품입력
router.post('/insert', function(req, res){
  const pid=req.body.pid;
  const bid=req.body.bid;
  const price=req.body.price;
  const qnt=req.body.qnt;
  const sql="insert into orders(pid,bid,price,qnt) values(?,?,?,?)";
  db.get().query(sql, [pid,bid,price,qnt], function(err, rows){
    if(err){
      console.log('...........err', err);
      res.send({result:0});
    }else{
      res.send({result:1});
    }
  });
});

//사용자별 주문목록
router.get('/list', function(req, res){
  const uid=req.query.uid;
  let sql="select *,date_format(pdate,'%Y-%m-%d %T') as fmtdate,";
  sql+=" format(sum,0) fmtsum";
  sql+=" from purchase where uid=?";
  sql+=" order by pdate desc";
  db.get().query(sql, [uid], function(err, rows){
    res.send(rows);
  });
});

//특정주문의 주문상품목록
router.get('/books', function(req, res){
  const pid=req.query.pid;
  let sql="select o.*, b.title, b.image,";
  sql+=" format(o.price,0) fmtprice, format(o.price*o.qnt,0) fmtsum"
  sql+=" from orders o, books b";
  sql+=" where o.bid=b.bid and pid=?";
  db.get().query(sql, [pid], function(err, rows){
    res.send(rows);
  });
});

module.exports = router;