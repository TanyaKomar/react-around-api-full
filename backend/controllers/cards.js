const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Validation failed: card cannot be created.');
      } 
    })
    .catch(next);
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else if (!card) {
        throw new NotFoundError('Card not found.');
      } else {
        throw new UnauthorizedError('Authorization required.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card not found.');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found.');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Card not found.');
    }
    res.send({ data: card });
  })
  .catch(next);
    
};
