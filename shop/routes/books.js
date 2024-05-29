var express = require('express');
var router = express.Router();
var db = require('../db');

/*도서등록*/
router.post('/insert', function(req, res, next) {
  const title=req.body.title;
  const price=req.body.price;
  const contents=req.body.contents;
  const isbn=req.body.isbn;
  const publisher=req.body.publisher;
  const author=req.body.authors;
  const image=req.body.thumbnail;
  //console.log(title,price,contents,isbn,publisher,author,image);

  const sql='select * from books where isbn=?';
  db.get().query(sql, [isbn], function(err, rows){
    if(rows.length==0){
      const sql1='insert into books(title,price,contents,isbn,publisher,author,image) values(?,?,?,?,?,?,?)';
      db.get().query(sql1, [title,price,contents,isbn,publisher,author,image], function(err, rows){
        if(err){
          console.log('err.............', err);
          res.send({result:0})
        }else {
          res.send({result:1});
        }
      })
    }else{
      res.send({result:0});
    }
  });  
});

module.exports = router;