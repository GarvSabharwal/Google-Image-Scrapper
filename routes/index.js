var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/search', function (req, res) {
    res.render('search', { title: 'Express' });
});

router.post('/search', function (req, res) {

    var keyword = JSON.parse(JSON.stringify(req.body));
    var dao = require("../server/dao/keywordDao.js");
    dao.addKeyword(keyword, function (status) {

        var search = require("../search.js");
        search.searchKeyword(keyword, function ()
        { res.render('index'); }

        );
        
    });

});       
           
router.get('/keywords', function (req, res) {

    var dao = require("../server/dao/keywordDao.js");

    dao.selectkeyword(function (data) { res.render('keywords', { students: data }); })

    
});


router.get('/searched_images', function (req, res) {

    id = req.query.keyword;
    res.render('searched_images', { keyword: id }); 

});

module.exports = router;