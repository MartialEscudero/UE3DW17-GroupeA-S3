var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT set status of document to "Indisponible" with the given id */
router.put('/borrow', function (req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.update({ _id: req.body.id }, { $set: { status: 'Indisponible' } }, function (e) {
        if (e === null) {
            res.sendStatus(200);
        } else {
            res.status(500).json({ error: e });
        }
    });
});

/* PUT set status of document to "Disponible" with the given id */
router.put('/return', function (req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.update({ _id: req.body.id }, { $set: { status: 'Disponible' } }, function (e) {
        if (e === null) {
            res.sendStatus(200);
        } else {
            res.status(500).json({ error: e });
        }
    });
});

/* Get status of document with the given id */
router.get('/status', function (req, res) {
    var db = req.db;
    var collection = db.get('documents');
    collection.find({ _id: req.body.id }, {fields: {status: 1}}, function (e, doc) {
        if (e === null) {
            res.status(200);
            res.send(doc).json;
        } else {
            res.status(500).json({ error: e });
        }
    });
});

module.exports = router;
