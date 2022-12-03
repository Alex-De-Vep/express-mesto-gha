const Card = require('../models/card');
const { ERROR_CODE, ERROR_CODE_VALIDATION, ERROR_CODE_NOT_FOUND } = require('../Constants');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const setCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }

      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  setCardLike,
  deleteCardLike,
};
