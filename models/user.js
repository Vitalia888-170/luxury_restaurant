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
  },
  reservation: {
    details: [
      {
        date: Date,
        hour: {
          type: String,
          required: true
        },
        guests: {
          type: Number,
          required: true
        },
        isConfirm: {
          type: Boolean,
          default: false
        }
      }
    ]
  }
})

user.methods.makeReservation = function (date, hour, guests) {
  let details = [...this.reservation.details];
    details.unshift({
      date, hour, guests, isConfirm: false
    })
  this.reservation = { details };
  return this.save();
}

module.exports = model('User', user);