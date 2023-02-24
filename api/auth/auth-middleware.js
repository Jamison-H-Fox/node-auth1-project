const User = require('../users/users-model')

async function restricted(req, res, next) {
  console.log(`we've passed through the restricted middleware`)
  next()
}

async function checkUsernameFree(req, res, next) {
  try{
    const users = await User.findBy({ username: req.body.username })
    if (!users.length) {
      next()
    }
    else {
      next({ status: 422, message: 'Username taken' })
    }
  } catch(err) {
    next(err)
  }
}

async function checkUsernameExists(req, res, next) {
  try{
    const users = await User.findBy({ username: req.body.username })
    if (users.length) {
      next()
    }
    else {
      next({ status: 401, message: 'Invalid credentials' })
    }
  } catch(err) {
    next(err)
  }
}

function checkPasswordLength(req, res, next) {
  if (req.body.password === undefined || req.body.password.trim().length < 3) {
    next({ status: 422, message: 'Password must be longer than 3 chars' })
  } else {
    next()
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
}