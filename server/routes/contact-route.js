const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const contactController = require("../controllers/contact-controller");

router.post(
  "/uploadContactForm",
  [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("mobile").isLength({ min: 11 }),
    check("message").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    contactController.createContact(req, res, next);
  }
);

router.get("/getContactForm", contactController.getContact);

router.get("/getContactForm/:id", contactController.getContactById);

router.delete("/removeContactForm/:id", contactController.deleteContact);

module.exports = router;
