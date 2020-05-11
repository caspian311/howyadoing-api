const uuid = require('uuid').v4
const db = require('../../models');
const User = db.users;
const Session = db.sessions;
const Op = db.Sequelize.Op;

async function post(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    try {
        let users = await User.findAll({ 
            attributes: ['id', 'name', 'email', 'goal'],
            where: {
            [Op.and]: {
                email: email,
                password: password
            }
        }})

        if (users.length === 0) {
            res.status(400).send({message: 'Incorrect email and/or password'})
            return 
        } 

        let user = users[0]
        
        await Session.destroy({ where: { userId: user.id }})
        let session = await Session.create({ token: uuid(), userId: user.id })

        res.send(session)
    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = { post };