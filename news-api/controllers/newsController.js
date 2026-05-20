const axios = require("axios");

// Supported country codes by NewsAPI
const VALID_COUNTRY_CODES = [
  "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn",
  "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu",
  "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma",
  "mx", "my", "ng", "nl", "no", "nz", "ph", "pk", "pl", "pt",
  "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr",
  "tw", "ua", "us", "ve", "za",
];

/* GET NEWS HEADLINES BY COUNTRY CODE */
exports.getNewsByCountry = async (req, res) => {
  const { countryCode } = req.params;

  // Validate country code
  if (!countryCode || countryCode.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Country code is required",
      example: "/api/news/us",
    });
  }

  const code = countryCode.toLowerCase().trim();

  if (!VALID_COUNTRY_CODES.includes(code)) {
    return res.status(400).json({
      success: false,
      error: `"${countryCode}" is not a valid country code.`,
      valid_examples: ["us", "pk", "gb", "in", "au", "ca", "de", "fr"],
      full_list: VALID_COUNTRY_CODES,
    });
  }

  const API_KEY = process.env.NEWS_API_KEY;

  if (!API_KEY || API_KEY === "your_newsapi_key_here") {
    return res.status(500).json({
      success: false,
      error: "NewsAPI key is not configured. Please set NEWS_API_KEY in your .env file.",
      hint: "Get a free API key from https://newsapi.org/register",
    });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines`;
    const response = await axios.get(url, {
      params: {
        country: code,
        pageSize: 10, // Limit to 10 articles
        apiKey: API_KEY,
      },
    });

    const data = response.data;

    if (data.status !== "ok") {
      return res.status(500).json({
        success: false,
        error: data.message || "Failed to fetch news",
      });
    }

    if (!data.articles || data.articles.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No news headlines found for country code "${code}".`,
      });
    }

    // Build structured response — filter out articles with [Removed] content
    const articles = data.articles
      .filter((article) => article.title && article.title !== "[Removed]")
      .slice(0, 10)
      .map((article, index) => ({
        index: index + 1,
        title: article.title,
        source: article.source.name || "Unknown Source",
        url: article.url,
        published_at: article.publishedAt,
        description: article.description || "No description available",
      }));

    res.json({
      success: true,
      country_code: code.toUpperCase(),
      total_results: data.totalResults,
      showing: articles.length,
      fetched_at: new Date().toISOString(),
      headlines: articles,
    });
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 401) {
        return res.status(401).json({
          success: false,
          error: "Invalid API key. Please check your NEWS_API_KEY in .env file.",
        });
      }

      if (status === 429) {
        return res.status(429).json({
          success: false,
          error: "Too many requests. NewsAPI free tier has a rate limit. Please wait and try again.",
        });
      }

      return res.status(status).json({
        success: false,
        error: message || "NewsAPI error occurred",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch news. Please check your internet connection.",
    });
  }
};
