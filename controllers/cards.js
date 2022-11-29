const { isValidObjectId } = require('mongoose');
const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  if (!isValidObjectId(req.params.cardId.trim().toString())) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }

  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const setCardLike = (req, res) => {
  if (!isValidObjectId(req.params.cardId.trim().toString())) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const deleteCardLike = (req, res) => {
  if (!isValidObjectId(req.params.cardId.trim().toString())) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  setCardLike,
  deleteCardLike,
};
