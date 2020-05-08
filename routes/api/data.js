const db = require('../../models');
const Metric = db.metrics;
const Op = db.Sequelize.Op;

function get(_, res) {
  Metric.findAll({
    order: [
      ['createdAt', 'ASC']
    ],
    limit: 30
  })
    .then((data) => {
      const formattedData = data.map((datum) => {
        return {
          goal: datum.goal,
          value: datum.value,
          date: nextDay(datum.createdAt)
        }
      });
      res.send(formattedData);
    });
}

function post(req, res) {
  let value = req.body.value;
  let currentDate = formatDate();
  let condition = {createdAt: { [Op.gte]: currentDate } };
  
  Metric.destroy({ where: condition, truncate: false })
    .then(() => {
      Metric.create({
        value: value,
        goal: 200,
        createdAt: currentDate
      })
        .then(data => {
          res.status(201).send(data)
        })
        .catch(err => {
          res.status(500).send({message: err.message})
        })
    })
}

function nextDay(d1) {
  let d2 = new Date();
  d2.setTime(d1.getTime() + (60 * 60 * 24 * 1000));
  return d2;
}

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

  return [year, month, day].join('-') + ' 00:00:00Z';
}


module.exports = { get, post };