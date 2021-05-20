const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
console.log(process.cwd());
const users = require('./routes/users');
const cards = require('./routes/cards');

const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { celebrate, errors } = require('celebrate');
const Joi = require('joi');

const app = express();
const jsonParser = bodyParser.json();

const { requestLogger, errorLogger } = require('./middleware/logger');

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(jsonParser);
app.use(helmet());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/sighup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({scheme: ['http', 'https'] }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}), createUser);

app.use(auth);
app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`Link to the server: ${PORT}`);
});
