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
          ref: 'Dish'
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
user.methods.addToCart = function (dish) {
  const items = [...this.cart.items];
  const index = items.findIndex(item => {
     return item.dishId.toString() === dish._id.toString();
  });
  if (index >= 0) {
     items[index].count = items[index].count + 1
  } else {
     items.push({
        count: 1,
        dishId: dish._id
     })
  }
  this.cart = { items }
  return this.save();
}
user.methods.removeFromCart = function (id) {
  let items = [...this.cart.items];
  const index = items.findIndex(item => item.dishId.toString() === id.toString());
  if (items[index].count === 1) {
     items = items.filter(item => item.dishId.toString() !== id.toString())
  } else {
     items[index].count--
  }
  this.cart = { items }
  return this.save()
}

user.methods.clearCart = function () {
  this.cart = { items: [] }
  return this.save();
}


module.exports = model('User', user);