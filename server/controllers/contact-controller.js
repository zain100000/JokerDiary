const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Contact = require("../models/contact-model");

const createContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  try {
    const { name, email, mobile, message } = req.body;

    const contact = new Contact({
      name,
      email,
      mobile,
      message,
    });

    await contact.save();
    res.status(201).json({ message: "Contact Form Submitted Successfully!" });
  } catch {
    const error = new HttpError("Failed To Create Contact Form!", 500);
    return next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.find();

    if (!contact) {
      return res.status(404).json({ message: "No Contact Form Yet!" });
    }

    res.status(200).json({ Contact: contact });
  } catch {
    const error = new HttpError("Failed To Get Contact Forms!");
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact Form not found for Provided Id" });
    }

    res.status(200).json({ Contact: contact });
  } catch {
    const error = new HttpError("Contact Form Not Found By Provided Id!.", 500);
    return next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const Id = req.params.id;

  if (!Id) {
    return res.status(400).json({ message: "Invalid Contact Form ID" });
  }

  let contact;
  try {
    contact = await Contact.findById(Id).populate("name");
  } catch (err) {
    const error = new HttpError("Failed To Delete Contact Form!.", 500);
    return next(error);
  }

  if (!contact) {
    return res.status(404).json({ message: "Contact Form not found." });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Contact.deleteOne({ _id: Id }, { session });

    await session.commitTransaction();

    res.status(200).json({ message: "Contact Form Deleted Successfully." });
  } catch (err) {
    await session.abortTransaction();

    console.error("Error deleting Contact Form:", err);

    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    session.endSession();
  }
};

module.exports = {
  createContact,
  getContact,
  getContactById,
  deleteContact,
};
