const db = require('../../models');
const User = db.users;
const Session = db.session;
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
            }
            let user = data[0]
            res.send(user)
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    
}

module.exports = { post };