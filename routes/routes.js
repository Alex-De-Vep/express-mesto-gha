const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexp } = require('../utils/utils');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routerCard = require('./routerCard');
const routerUser = require('./routerUser');
const NotFoundError = require('../utils/errors/notFound');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/', routerUser);
router.use('/', routerCard);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
