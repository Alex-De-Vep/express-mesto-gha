const router = require("express").Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find({})
    .then(data => res.send({data}))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/users:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({name, about, avatar})
    .then((data) => res.send({data}))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка', err }));
});

module.exports = router;