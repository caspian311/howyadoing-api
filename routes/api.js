const express = require('express');
const router = express.Router();
const db = require('../models');
const Metric = db.metrics;

router.get('/data', function (_, res) {
  Metric.findAll()
    .then((data) => {
      const formattedData = data.map((datum) => {
        return {
          goal: datum.goal,
          value: datum.value,
          date: datum.createdAt
        }
      });
      res.send(formattedData);
    });
});

router.post('/data', function (req, res) {
  let value = req.body.value;
  
  Metric.create({
    value: value,
    goal: 200
  })
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })

  
});

module.exports = router;