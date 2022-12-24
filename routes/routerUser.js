const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUsers, getCurrentUser, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { regexp } = require('../utils/utils');

routerUser.get('/users', getUsers);

routerUser.get('/users/me', getUser);

routerUser.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getCurrentUser);

routerUser.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), updateUser);

routerUser.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexp),
  }),
}), updateUserAvatar);

module.exports = routerUser;
