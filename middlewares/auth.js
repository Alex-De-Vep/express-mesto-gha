const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = auth;