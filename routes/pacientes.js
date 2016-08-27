var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pacientes');
});

router.get('/new', function(req, res, next) {
  res.render('paciente');
});

router.get('/:id', function(req, res, next) {
  res.render('paciente', {pacienteId: req.params.id});
});

module.exports = router;
