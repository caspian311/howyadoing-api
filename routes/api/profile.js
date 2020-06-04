const db = require('../../models');
const User = db.users;
const crypto = require('crypto')
const secret = process.env.SECRET || 'mysecret'

async function get(req, res) {
    try {
        let userId = req.session.user.id

        let user = await User.findByPk(userId, {
            attributes: ['name', 'email', 'goal']
        })

        res.send(user)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

async function put(req, res) {
    try {
        let userId = req.session.user.id

        await User.update(req.body, {where: { id: userId }})
        res.status(201).send({ message: 'updated' })
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

async function post(req, res) {
    let newUser = req.body
    newUser.password = crypto.createHmac('sha256', secret)
                        .update(req.body.password)
                        .digest('hex');

    try {
        await User.create(newUser)
        res.status(201).send({ message: 'updated' })
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = { get, post, put };