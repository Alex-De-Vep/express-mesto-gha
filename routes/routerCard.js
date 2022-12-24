const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCard, setCardLike, deleteCardLike,
} = require('../controllers/cards');
const { regexp } = require('../utils/utils');

routerCard.get('/cards', getCards);

routerCard.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexp),
  }),
}), createCard);

routerCard.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

routerCard.put('/cards/likes/:cardId/', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), setCardLike);

routerCard.delete('/cards/likes/:cardId/', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCardLike);

module.exports = routerCard;
