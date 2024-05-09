const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quoteOfDayUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
