const routerCard = require('express').Router();
const {
  createCard, getCards, deleteCard, setCardLike, deleteCardLike,
} = require('../controllers/cards');

routerCard.get('/cards', getCards);

routerCard.post('/cards', createCard);

routerCard.delete('/cards/:cardId', deleteCard);

routerCard.put('/cards/:cardId/likes', setCardLike);

routerCard.delete('/cards/:cardId/likes', deleteCardLike);

module.exports = routerCard;
