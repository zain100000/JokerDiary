const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobile: { type: String },
  message: { type: String },
});

const contact = mongoose.model("Contact", contactSchema);

module.exports = contact;
