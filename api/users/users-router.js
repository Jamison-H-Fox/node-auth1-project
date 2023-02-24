const router = require('express').Router();
const { restricted } = require('../auth/auth-middleware');
const Users = require('./users-model');

router.get('/', restricted, async (req, res, next) => { // I have to get a cookie before I can test this...
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch(err) {
    next(err);
  }
});

module.exports = router