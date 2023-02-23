const router = require('express').Router();
const { restricted } = require('../auth/auth-middleware');
const Users = require('./users-model');

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */
router.get('/', /*restricted,*/ (req, res, next) => { // eslint-disable-line
  res.status(200).json({ message: 'working on the users router' })
})


module.exports = router