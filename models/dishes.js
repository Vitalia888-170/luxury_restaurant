const { Schema, model } = require('mongoose');
const dish = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  price: {
    type: Number,
    required: true
  },
  isSpecial: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Dish', dish);