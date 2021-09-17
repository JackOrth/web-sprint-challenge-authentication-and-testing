const router = require('express').Router();
const { JWT_SECRET } = require('../secrets/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../users/users-model')
const {
  registerInfo,
  checkUsernameExists,
  checkUserExists
} = require('./auth-middleware')


router.post('/register', registerInfo, checkUsernameExists, (req, res, next) => {
 const {username, password} = req.body
 const hash = bcrypt.hashSync(password, 8)
 User.add({username, password: hash})
      .then(newUser => {
        res.status(201).json(newUser)
      }).catch((err) => {
        next(err)
      })
});

router.post('/login', checkUserExists, (req, res, next) => {
      if(bcrypt.compareSync(req.body.password , req.user.password)){
        const token = buildToken(req.user)
        res.json({
          message: `${req.user.username} is back!`,
          token
        })
      }else{
        next({
          status: 401,
          message: 'Invalid credentials'
        })
      }
});
function buildToken(user){
  const payload= {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
