const db = require('../../models');
const User = db.users;
const Session = db.sessions;

async function get(req, res) {
    try {
        let sessions = await Session.findAll({
            where: {
              token: req.headers['authorization']
            }
        })

        if (sessions.length === 0) {
            res.send(401).send({message: 'Request is not authorized'})
            return
        }

        let userId = sessions[0].userId

        let user = await User.findByPk(userId, {
            attributes: ['name', 'email', 'goal']
        })

        res.send(user)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

async function post(req, res) {
    try {
        let sessions = await Session.findAll({
            where: {
              token: req.headers['authorization']
            }
        })

        if (sessions.length === 0) {
            res.send(401).send({message: 'Request is not authorized'})
            return
        }

        let userId = sessions[0].userId

        await User.update(req.body, {where: { id: userId }})
        res.status(201).send({ message: 'updated' })
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = { get, post };