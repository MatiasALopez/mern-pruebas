var express = require('express');
var router = express.Router();
var db = require('./../db');
var _ = require('underscore');

router.get('/', function(req, res, next) {
    db.openDbAndExecuteIfNotError(function(db) {
        db.collection('pacientes').find().toArray(function(err, docs) {
            res.json(docs);
            db.close();
        })
    });
});

router.get('/:id', function(req, res, next) {
    db.openDbAndExecuteIfNotError(function(db) {
        db.collection('pacientes').find({_id: parseInt(req.params.id)}).limit(1).toArray(function(err, docs) {
            res.json(docs[0] || {});
            db.close();
        });
    });
});

router.post('/', function(req, res, next) {
    db.openDbAndExecuteIfNotError(function(db) {
        db.collection('pacientes').insert(
            req.body,
            function(err, r) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).end();
                }
                db.close();
            });
    });
});

router.put('/:id', function(req, res, next) {
    db.openDbAndExecuteIfNotError(function(db) {
        db.collection('pacientes').updateOne(
            {_id: parseInt(req.params.id)}, 
            {$set: req.body});

        res.status(200).end();
        db.close();
    });
});


function obtenerPaciente(id) {
    return _.find(db.pacientes, function (p) { 
        return p.id == id; 
    });
}

function obtenerIndicePaciente(id) {
    return _.findIndex(db.pacientes, function (p) {
        return p.id == id;
    });
}

module.exports = router;