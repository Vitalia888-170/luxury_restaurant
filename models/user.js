const { Schema, model } = require('mongoose');

const user = new Schema({
  name: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExp: Date,
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        dishId: {
          type: Schema.Types.ObjectId,
          ref: 'Dishes'
        }
      }
    ]
  }
})

module.exports = model('User', user);