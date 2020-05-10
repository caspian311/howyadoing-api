const express = require('express')
const app = express()


const db = require('./models');
const Session = db.sessions;

app.use(async (req, res, next) => {
    console.log('Authenticating request...')

    if (isProtectedPath(req)) {
        console.log(' -- requesting safe endpoint')
        next()
        return
    }
    
    try {
        let session = await getSession(req)

        if (session) {
            console.log(' -- authorized')
            req.session.user = { id: session.userId }
            next()
        } else {
            console.log('session does not exist')
            console.log(' -- unauthorized')
            res.status(401).send({message: 'Request is not authorized'})
        }
    } catch(err) {
        console.log('error', err)
        console.log(' -- unauthorized')
        res.status(401).send({message: 'Request is not authorized'})
    }
})

async function getSession(req, res) {
    console.log('headers: ', req.headers)

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
        console.log('failed to retrieve the session info', err)
        return null
    }
}

function isProtectedPath(req) {
    const unprotectedPaths = [
        '/api/session',
    ]

    return !unprotectedPaths.indexOf(req.path) < 0
}

module.exports = app;