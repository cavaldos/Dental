var express = require('express');
var siteModel = require('../models/site.model');

var router = express.Router();

router.get('/', (req, res) => {
  siteModel.all().then(rows => {
    res.json(rows);
  })
})

router.get('/:id', (req, res) => {
  siteModel.single(req.params.id).then(rows => {
    if (rows.length > 0)
      res.json(rows[0]);
    else res.status(204).end();
  })
})

router.post('/', (req, res) => {
  siteModel.add(req.body).then(insertId => {
    res.status(201).json({
      id: insertId,
      ...req.body
    });
  })
})

router.delete('/:id', (req, res) => {
  siteModel.del(req.params.id).then(affectedRows => {
    res.json({
      resultCode: 0, // success
      affectedRows: affectedRows
    });
  })
})

router.patch('/:id', (req, res) => {
  var id = req.params.id;
  var entityWoId = req.body;
  siteModel.patch(id, entityWoId).then(changedRows => {
    res.json({
      id,
      ...req.body
    });
  });
})

module.exports = router;
