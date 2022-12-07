const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUsers, getCurrentUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getCurrentUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().alphanum().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2),
  }),
}), updateUserAvatar);

module.exports = router;
