const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, getUserById, updateUser, updateAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('users/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri({scheme: ['http', 'https'] }),
  }),
}), updateAvatar);

module.exports = router;
