const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)(www.)?[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9-._~:/?%#[\]@!$&'()*+,;=]{2,}#?$/igm.test(v);
      },
      message: (props) => `${props.value} is not a valid link to the picture!`,
    },
    required: [true, 'Link to the picture required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
