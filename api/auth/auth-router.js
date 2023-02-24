const router = require('express').Router();
const { 
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength, 
} = require('./auth-middleware');


/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
  res.status(200).json({ message: 'working on post api/auth/register' })
})

router.post('/login', checkUsernameExists, (req, res, next) => { // eslint-disable-line
  res.status(200).json({ message: 'working on post api/auth/login' })
})

router.get('/logout', (req, res, next) => { // eslint-disable-line
  res.status(200).json({ message: 'working on get api/auth/logout' })
})
 
module.exports = router;