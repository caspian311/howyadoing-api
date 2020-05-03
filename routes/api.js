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
    goal: 200,
    createdAt: formatDate()
  })
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({message: err.message})
    })
});

function formatDate() {
  let d = new Date();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  } if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}


module.exports = router;