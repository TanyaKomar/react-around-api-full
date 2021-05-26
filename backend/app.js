const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { PORT = 3000, MONGODB_URI, NODE_ENV } = process.env;
const NotFoundError = require('./errors/not-found-err');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { celebrate, errors } = require('celebrate');
const Joi = require('joi');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

const app = express();
const jsonParser = bodyParser.json();

const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(jsonParser);
app.use(helmet());
app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}), createUser);

app.use(auth);
app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.use(errors());

app.use(() => {
  throw new NotFoundError('Requested resource not found.');
});
app.use(errorLogger);
app.use(limiter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Link to the server: ${PORT}`);
});
