const router = require("express").Router();
const {getUsers, getCurrentUser, createUser, updateUser, updateUserAvatar} = require("../controllers/users");

router.get('/users', getUsers);

router.get('/users/:userId', getCurrentUser);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;