const express = require('express')
const app = express()

const db = require('./models');
const Session = db.sessions;

app.use(async (req, res, next) => {
    console.log('Authenticating request...')

    try {
        let session = await getSession(req)

        if (session) {
            console.log(' -- authorized')
            req.session.user = { id: session.userId }
            next()
        } else {
            console.log(' -- unauthorized')
            res.status(401).send({message: 'Request is not authorized'})
        }
    } catch(err) {
        console.log(' -- unauthorized')
        res.status(401).send({message: 'Request is not authorized'})
    }
})

async function getSession(req, res) {
    try {
        let sessions = await Session.findAll({
            where: {
              token: req.headers['authorization']
            }
        })

        if (sessions.length === 0) {
            return null
        }

        return sessions[0]
    } catch(err) {
        return null
    }
}

module.exports = app;