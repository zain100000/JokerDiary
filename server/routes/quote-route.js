const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quote-controller");
const fileUpload = require("../middleware/file-upload");

router.post("/addQuotes", fileUpload.upload, quoteController.addQuote);

router.get("/getQuotes", quoteController.getQuotes);

router.get("/getQuotes/:id", quoteController.getQuotesById);

router.get("/latestQuotes", quoteController.getLatestQuotes);

router.get("/getRandomQuotes", quoteController.getRandomQuotes);

router.delete("/removeQuotes/:id", quoteController.deleteQuote);

router.post("/likeQuote/:id", quoteController.addLikedQuote);

router.post("/unlikeQuote/:id", quoteController.removeLikedQuote);

router.get("/getLikedQuotes", quoteController.getLikedQuotes);

module.exports = router;
