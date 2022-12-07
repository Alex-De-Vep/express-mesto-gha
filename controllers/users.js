const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ValidationError, NotFoundError, DataAlreadyUseError } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    next(new ValidationError('Неправильные почта или пароль'));
  }

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.send({ name: user.name, about: user.about, email: user.email, avatar: user.avatar }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new DataAlreadyUseError('Невозможно использовать эти данные'));
          }

          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные'));
          }

          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ _id: user._id, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail()
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail()
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUser,
  getUsers,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
};
