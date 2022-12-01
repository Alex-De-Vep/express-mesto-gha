const User = require('../models/user');
const { ERROR_CODE, ERROR_CODE_VALIDATION, ERROR_CODE_NOT_FOUND } = require('../Constants');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(() => {
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(() => {
      res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(() => {
      res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
    })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
