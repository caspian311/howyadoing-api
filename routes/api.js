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

module.exports = router;