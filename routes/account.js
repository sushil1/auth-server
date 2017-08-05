const express = require('express')
const router = express.Router()
const Authentication = require('../controllers/authentication')
const User = require('../models/user')

const passportService = require('../services/passport')

const passport = require('passport')

const requireAuth = passport.authenticate('jwt', {session: false })

const requireSignin = passport.authenticate('local', {session:false})


router.get('/', requireAuth, function(req, res, next){
  User.find({}, function(err, users){
    if(err){return next(err)}

    if(!users){ return res.status(422).send({error:'No users found'})
  }

  const displayUser = users.map(user => {
    return user.email
  })
  res.send({
    confirmation:'success',
    members: displayUser
  })
  })
})

router.post('/signin', requireSignin, Authentication.signin)

router.post('/signup', Authentication.signup)

module.exports = router
