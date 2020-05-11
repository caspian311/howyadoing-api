const express = require('express')
const app = express()
const moment = require('moment')

const db = require('./models');
const Session = db.sessions;

app.use(async (req, res, next) => {
    console.log('Authenticating request...')

    try {
        let session = await getSession(req)

        if (isValid(session)) {
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

function isValid(session) {
    if (session == null) {
        return false
    }

    let thirtyDaysAgo = moment().subtract(30, 'days')
    let isTooOld = moment(session.createdAt).isBefore(thirtyDaysAgo)
    
    return !isTooOld
}

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