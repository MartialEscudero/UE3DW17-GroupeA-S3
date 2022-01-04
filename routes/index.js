var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Title page. */
router.get('/alltitle', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
    res.render('alltitle', {
      "documents" : docs
    });
  });
});

/* GET Title page. */
router.get('/ranktitle', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
    res.render('ranktitle', {
      "documents" : docs
    });
  });
});

module.exports = router;