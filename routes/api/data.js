const db = require('../../models');
const Metric = db.metrics;
const Session = db.sessions;
const Op = db.Sequelize.Op;

async function get(req, res) {
    try {
        let userId = req.session.user.id

        let data = await Metric.findAll({
            where: {
                userId: userId
            },
            order: [
                ['createdAt', 'ASC']
            ],
            limit: 30
        })
    
        let formattedData = data.map((datum) => {
            return {
                goal: datum.goal,
                value: datum.value,
                date: nextDay(datum.createdAt)
            }
        });
    
        res.send(formattedData);
    } catch(err) {
        res.status(500).send({message: err.message})
    }
    
}

async function post(req, res) {
    let userId = req.session.user.id
    
    let value = req.body.value;
    let currentDate = formatDate();
    let condition = {
        userId: userId, 
        createdAt: { [Op.gte]: currentDate } 
    };

    try {
        await Metric.destroy({ where: condition, truncate: false })

        let data = await Metric.create({
            value: value,
            userId: userId,
            createdAt: currentDate
          })

        res.status(201).send(data)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
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