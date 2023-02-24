const router = require('express').Router();
const User = require('../users/users-model');
const bcrypt = require('bcryptjs');

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
router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const newUser = { username, password: hash }
    const result = await User.add(newUser);
    res.status(201).json(result);
  } catch(err) {
    next(err)
  }
})

router.post('/login', checkUsernameExists, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [user] = await User.findBy({ username }) 
    // I'm making this^^^ trip to the db in order to get the hashed password
    // I could also use the checkUsernameExists middleware to append the hashed
    // password to the req.
    // That would keep my endpoint code cleaner and would maybe be a better use
    // of middleware. 🤷‍♂️
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user
      res.json({ message: `Welcome ${user.username}!` })
    } else {
      next({ status: 401, message: 'Invalid credentials' })
    }
  } catch (err){
    next(err)
  }
})

router.get('/logout', (req, res, next) => { // eslint-disable-line
  res.status(200).json({ message: 'working on get api/auth/logout' })
})
 
module.exports = router;