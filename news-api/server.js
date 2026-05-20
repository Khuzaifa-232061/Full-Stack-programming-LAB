const express = require("express");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Welcome Route */
app.get("/", (req, res) => {
  res.json({
    message: "News Headlines API is running!",
    endpoints: {
      getNewsByCountry: "GET /api/news/:countryCode",
      examples: [
        "GET /api/news/us  (United States)",
        "GET /api/news/pk  (Pakistan)",
        "GET /api/news/gb  (United Kingdom)",
        "GET /api/news/in  (India)",
      ],
      supported_country_codes:
        "us, gb, pk, in, au, ca, de, fr, jp, ae, sa, eg, ng, za, br, mx",
    },
  });
});

/* Routes */
app.use("/api/news", newsRoutes);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`News API running on http://localhost:${PORT}`);
  console.log(`Test it: http://localhost:${PORT}/api/news/us`);
});
