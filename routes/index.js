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

/* GET Title page. */
router.get('/authors', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
    res.render('authors', {
      "documents" : docs
    });
  });
});

/* GET Title page. */
router.get('/notype', function(req, res) {
  var db = req.db;
  var collection = db.get('documents');
  collection.find({},{},function(e,docs){
    res.render('notype', {
      "documents" : docs
    });
  });
});

/* GET "every document type" page. Unless this field is missing in the document */
router.get('/everytype', function (req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.aggregate([{ $match: { "fields.type_de_document": { $exists: true } } }, { $group: { _id: "$fields.type_de_document" } }, { $sort: { _id: 1 } }], function (e, docs) {
        res.render('everytype', {
            "documents": docs
        });
    });
});

/* GET borrow/return page */
router.get('/library', function (req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({}, {}, function (e, docs) {
        res.render('library', {
            "documents": docs
        });
    });
});

module.exports = router;