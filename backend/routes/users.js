const router = require('express').Router();
const {
  getUsers, getUser, getUserById, updateUser, updateAvatar
} = require('../backend/controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.get('users/me', getUser);

module.exports = router;
