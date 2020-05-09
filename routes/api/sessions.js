const uuid = require('uuid').v4
const db = require('../../models');
const User = db.users;
const Session = db.sessions;
const Op = db.Sequelize.Op;

function post(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.findAll({ 
        attributes: ['id', 'name', 'email', 'goal'],
        where: {
        [Op.and]: {
            email: email,
            password: password
        }
    } })
        .then((data) => {
            if (data.length === 0) {
                res.status(400).send({message: 'Incorrect email and/or password'})
            } else {
                let user = data[0]
                
                Session.create({ token: uuid(), userId: user.id })
                    .then((session) => {
                        res.send(session)
                    })
                    .catch((err) => {
                        res.status(500).send({message: err.message})
                    })
            }
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    
}

module.exports = { post };