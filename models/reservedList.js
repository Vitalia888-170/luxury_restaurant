const { Schema, model } = require("mongoose");

const reservedList = new Schema({
  date: {
    type: Date,
    required: true
  },
  details: {
    items: [
      {
        hour: {
          type: String,
          required: true
        },
        canvas:String,
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        }
      }
    ]
  }
});

module.exports = model('ReservedList', reservedList);