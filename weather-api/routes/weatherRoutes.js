const express = require("express");
const router = express.Router();
const controller = require("../controllers/weatherController");

/* GET /api/weather/:city */
router.get("/:city", controller.getWeatherByCity);

module.exports = router;
