const db = require('../../models');
const User = db.users;
const Op = db.Sequelize.Op;

function get(_, res) {
    User.findAll({
        attributes: ['name', 'email', 'goal']
    })
    .then((data) => {
        if (data.length > 0) {
            res.send(data[0])
        } else {
            res.status(404).send({message: 'no user found'})
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

function post(req, res) {
    User.update(req.body, {where: {}})
        .then((data) => {
            res.status(201).send({ message: 'updated' })
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
}

module.exports = { get, post };