const express = require("express");
const router = express.Router();
const controller = require("../controllers/newsController");

/* GET /api/news/:countryCode */
router.get("/:countryCode", controller.getNewsByCountry);

module.exports = router;
