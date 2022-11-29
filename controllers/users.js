const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then(data => res.send({data}))
    .catch((err) => {
      res.status(500).send({ message: 'Произошла ошибка' })
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({message: 'Запрашиваемый пользователь не найден'});
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then((data) => res.send({data}))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(400).send({message: 'Переданы некорректные данные'});
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' })
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) {
    res.status(400).send({message: 'Переданы некорректные данные'});
    return;
  }

  User.findByIdAndUpdate(req.user._id, {name, about})
    .then(data => res.send({ data }))
    .catch(err => {
      if (err.name === "ValidationError") {
        res.status(400).send({message: 'Переданы некорректные данные'});
        return;
      }

      if (err.name === "CastError") {
        res.status(404).send({message: 'Запрашиваемый пользователь не найден'});
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(400).send({message: 'Переданы некорректные данные'});
    return;
  }

  User.findByIdAndUpdate(req.user._id, {avatar})
    .then(data => res.send({ data }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({message: 'Переданы некорректные данные'});
        return;
      }

      if (err.name === "CastError") {
        res.status(404).send({message: 'Запрашиваемый пользователь не найден'});
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' })
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  updateUser,
  updateUserAvatar
}