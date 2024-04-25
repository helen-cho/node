var express = require('express');
var router = express.Router();
var db = require('../db');

/*게시판 목록페이지 이동*/
router.get('/', function (req, res, next) {
    res.render('index.ejs', { title:'게시판',pageName:'posts/list.ejs' });
});

//게시판 목록 데이터 불러오기
router.get('/list.json', function(req, res){
    const sql='select * from posts order by pid desc';
    db.get().query(sql, function(err, rows){
        if(err){
            console.log('게시판목록:', err);
        }else{
            res.send(rows);
        }
    });
});

//글쓰기 페이지로 이동
router.get('/insert', function(req, res){
    res.render('index.ejs', {title:'글쓰기', pageName:'posts/insert.ejs'})
});

//글을 DB저장
router.post('/insert', function(req, res){
    const title=req.body.title;
    const contents=req.body.contents;
    const uid=req.body.uid;
    console.log(title, contents, uid);
    const sql="insert into posts(title,contents,writer) values(?,?,?)";
    db.get().query(sql, [title, contents, uid], function(err, rows){
        res.redirect('/posts');
    });
});

module.exports = router;