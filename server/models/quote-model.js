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
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
