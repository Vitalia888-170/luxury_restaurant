const { Schema, model } = require("mongoose");

const reservedList = new Schema({
  date: {
    type: Date,
    required: true
  },
  hour: {
    value: String,
    tables: []
  }
});

module.exports = model('ReservedList', reservedList);