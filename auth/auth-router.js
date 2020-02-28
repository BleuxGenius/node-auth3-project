require('dotenv').config();
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //<< install the npm pacakage 

const Users = require('../users/users-model.js');


const { jwtSecret } = require('../secrets.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    // get credentials off the body 
    let user = req.body;
    console.log(user);
    // hash the password
    const salt = 10 // length of the password
    const hash = bcrypt.hashSync(user.password, salt);
    // set user password to the hash 
    user.password = hash;

    // add the users to the database 
    Users.add(user)
    .then(saved => {
        const token = generateToken(user);
        res.status(500).json(saved, token);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // get a token

        res.status(200).json({
            message: `welcome ${user.username}!`,
            token, // send the token 
        });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
})
.catch(error => {
    console.log("ERROR: ", error);
    res.status(500).json({ error: '/login error'});
});
});


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role || "user",
    };

    const options ={
        expiresIn: "1hr",
    };

    return jwt.sign(payload, jwtSecret, options);

}
module.exports = router;