const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Welcome Route */
app.get("/", (req, res) => {
  res.json({
    message: "Weather Forecast API is running!",
    endpoints: {
      getWeatherByCity: "GET /api/weather/:city",
      example: "GET /api/weather/Islamabad",
    },
  });
});

/* Routes */
app.use("/api/weather", weatherRoutes);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Weather API running on http://localhost:${PORT}`);
  console.log(`Test it: http://localhost:${PORT}/api/weather/Islamabad`);
});
