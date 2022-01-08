const { Schema, model } = require('mongoose');

const order = new Schema({
   dishes: [
      {
         dish: {
            type: Object,
            required: true
         },
         count: {
            type: Number,
            required: true
         }
      }
   ],
   user: {
      name: String,
      email:String
   },
   date: {
      type: Date,
      default: Date.now
   },
   isAccept:Boolean
})




module.exports = model('Order', order);