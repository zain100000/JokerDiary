const HttpError = require("../models/http-error");
const Quote = require("../models/quote-model");
const fileUpload = require("../middleware/file-upload");
const { v2: cloudinary } = require("cloudinary");

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

    const { category } = req.body;

    if (!req.file) {
      throw new HttpError("No image file provided!", 400);
    }

    const ImgUrl = await fileUpload.cloudinaryImageUpload(req.file);

    const quote = new Quote({
      id,
      category,
      image: ImgUrl,
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
    const latestQuotes = await Quote.find().sort({ _id: -1 }).limit(10);

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

const getRandomQuotes = async (req, res, next) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random);

    if (!randomQuote) {
      return res.status(404).json({ message: "No Quotes Found!" });
    }

    res.status(200).json({ Quote: randomQuote });
  } catch (error) {
    console.error("Error fetching random quote:", error);
    const err = new HttpError("Failed to fetch random quote!", 500);
    return next(err);
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

    if (quote.image) {
      try {
        const publicId = quote.image
          .split("/")
          .slice(-4)
          .join("/")
          .split(".")[0];

        const deletionResult = await cloudinary.uploader.destroy(publicId);
        if (deletionResult.result === "ok") {
          console.log(`Quote  deleted from Cloudinary: ${publicId}`);
        } else {
          console.error(`Failed to delete Quote  from Cloudinary: ${publicId}`);
        }
      } catch (err) {
        console.error("Error deleting Quote  from Cloudinary:", err);
      }
    }

    await Quote.deleteOne({ _id: quoteId });

    res.status(200).json({ message: "Quote Deleted Successfully." });
  } catch (error) {
    console.log("Error deleting Quote:", error);
    const err = new HttpError("Failed To Delete Quote!", 500);
    return next(err);
  }
};

const addLikedQuote = async (req, res, next) => {
  const quoteId = req.params.id;

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.liked = true;
    await quote.save();

    res.status(200).json({ message: "Quote added to liked quotes" });
  } catch (error) {
    console.error("Error adding liked quote:", error);
    res.status(500).json({ message: "Failed to add liked quote" });
  }
};

const removeLikedQuote = async (req, res, next) => {
  const quoteId = req.params.id;

  try {
    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.liked = false;
    await quote.save();

    res.status(200).json({ message: "Quote removed from liked quotes" });
  } catch (error) {
    console.error("Error removing liked quote:", error);
    res.status(500).json({ message: "Failed to remove liked quote" });
  }
};

const getLikedQuotes = async (req, res, next) => {
  try {
    const likedQuotes = await Quote.find({ liked: true });

    if (!likedQuotes || likedQuotes.length === 0) {
      return res.status(404).json({ message: "No Liked Quotes found!" });
    }

    res.status(200).json({ LikedQuotes: likedQuotes });
  } catch (error) {
    console.error("Error fetching liked quotes:", error);
    const err = new HttpError("Failed to fetch liked quotes!", 500);
    return next(err);
  }
};

module.exports = {
  addQuote,
  getQuotes,
  getQuotesById,
  deleteQuote,
  getLatestQuotes,
  getRandomQuotes,
  addLikedQuote,
  removeLikedQuote,
  getLikedQuotes,
};
