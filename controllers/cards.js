const Card = require('../models/card');
const { ValidationError, NotFoundError, ForbiddenError } = require('../utils/errors');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next();
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Невозможно удалить карточку'));
      } else {
        Card.deleteOne(card)
          .then(() => res.send({ card }));
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next();
    });
};

const setCardLike = (req, res, next) => {
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
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next();
    });
};

const deleteCardLike = (req, res, next) => {
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
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      }

      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      }

      next();
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  setCardLike,
  deleteCardLike,
};
