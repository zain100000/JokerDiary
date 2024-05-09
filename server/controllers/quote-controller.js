const HttpError = require("../models/http-error");
const Quote = require("../models/quote-model");

const addQuote = async (req, res, next) => {
  try {
    let quotes = await Quote.find({});
    let id;
    if (quotes.length > 0) {
      let last_quote_array = quotes.slice(-1);
      let last_quote = last_quote_array[0];
      id = last_quote.id + 1;
    } else {
      id = 1;
    }

    const { title, category } = req.body;

    const quote = new Quote({
      id,
      title,
      category,
    });

    await quote.save();
    res
      .status(201)
      .json({ success: true, message: "Quote Added successfully!" });
  } catch (error) {
    console.error("Error Adding Quote:", error);
    const err = new HttpError("Failed To Add Quote!", 500);
    return next(err);
  }
};

const getQuotes = async (req, res, next) => {
  try {
    const { category } = req.query;

    let quotes;

    if (category) {
      quotes = await Quote.find({ category });
    } else {
      quotes = await Quote.find();
    }

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ message: "No Quotes found!" });
    }

    res.status(200).json({ Quote: quotes });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    const err = new HttpError("Failed to fetch quotes!", 500);
    return next(err);
  }
};

const getQuotesById = async (req, res, next) => {
  try {
    const quoteId = req.params.id;
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res
        .status(404)
        .json({ message: "Quote not found for Provided Id" });
    }

    res.status(200).json({ Quote: quote });
  } catch {
    const error = new HttpError("Quote Not Found By Provided Id!.", 500);
    return next(error);
  }
};

const getLatestQuotes = async (req, res, next) => {
  try {
    const latestQuotes = await Quote.find().sort({ _id: -1 }).limit(10); // Fetch latest 10 quotes sorted by creation date

    if (!latestQuotes || latestQuotes.length === 0) {
      return res.status(404).json({ message: "No Latest Quotes found!" });
    }

    res.status(200).json({ LatestQuotes: latestQuotes });
  } catch (error) {
    console.error("Error fetching latest quotes:", error);
    const err = new HttpError("Failed to fetch latest quotes!", 500);
    return next(err);
  }
};

const getQuoteOfDay = async (req, res, next) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const quoteOfDay = await Quote.findOne({
      createdAt: { $lt: twentyFourHoursAgo },
    }).sort({ quoteOfDayUpdatedAt: -1 });

    if (!quoteOfDay) {
      const randomQuote = await Quote.aggregate([
        { $sample: { size: 1 } },
      ]).exec();

      await Quote.updateOne(
        { _id: randomQuote._id },
        { $set: { quoteOfDayUpdatedAt: Date.now() } }
      );

      res.status(200).json({ quote: randomQuote });
    } else {
      res.status(200).json({ quote: quoteOfDay });
    }
  } catch (error) {
    console.error("Error fetching quote of the day:", error);
    const err = new HttpError("Failed to fetch quote of the day!", 500);
    return next(err);
  }
};

const updateQuotes = async (req, res, next) => {
  const quoteId = req.params.id;

  if (!quoteId) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Quote ID" });
  }

  try {
    let quote = await Quote.findById(quoteId);

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: "Quote not found." });
    }

    if (
      req.headers["content-type"] &&
      req.headers["content-type"].includes("application/json")
    ) {
      if (req.body.title) quote.title = req.body.title;
      if (req.body.category) quote.category = req.body.category;
    } else {
      quote = { ...quote, ...req.body };
    }

    await quote.save();

    res
      .status(200)
      .json({ success: true, message: "Quote Updated Successfully." });
  } catch (err) {
    console.error("Error updating Quote:", err);
    const error = new HttpError("Failed To Update Quote!", 500);
    return next(error);
  }
};

const deleteQuote = async (req, res, next) => {
  const quoteId = req.params.id;

  if (!quoteId) {
    return res.status(400).json({ message: "Invalid Quote ID" });
  }

  try {
    const quote = await Quote.findById(quoteId);

    if (!quoteId) {
      return res.status(404).json({ message: "Quote not found." });
    }

    await Quote.deleteOne({ _id: quoteId });

    res.status(200).json({ message: "Quote Deleted Successfully." });
  } catch (error) {
    console.log("Error deleting Quote:", error);
    const err = new HttpError("Failed To Delete Quote!", 500);
    return next(err);
  }
};

module.exports = {
  addQuote,
  getQuotes,
  getQuotesById,
  updateQuotes,
  deleteQuote,
  getLatestQuotes,
  getQuoteOfDay,
};
