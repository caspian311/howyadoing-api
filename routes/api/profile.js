const db = require('../../models');
const Metric = db.metrics;
const Op = db.Sequelize.Op;

function get(_, res) {
    res.send({
        name: 'Matt Todd',
        email: 'matt.c.todd@gmail.com',
        goal: 200
    });
}

function post() {

}

module.exports = { get, post };