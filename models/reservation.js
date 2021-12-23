const { Schema, model } = require('mongoose');

const reservation = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  date: Date,
  hours: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Reservation', reservation);