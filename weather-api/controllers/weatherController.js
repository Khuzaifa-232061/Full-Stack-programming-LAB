const axios = require("axios");

/* GET WEATHER BY CITY NAME */
exports.getWeatherByCity = async (req, res) => {
  const { city } = req.params;

  // Validate city name
  if (!city || city.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "City name is required",
    });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY || API_KEY === "your_openweather_api_key_here") {
    return res.status(500).json({
      success: false,
      error: "OpenWeather API key is not configured. Please set OPENWEATHER_API_KEY in your .env file.",
      hint: "Get a free API key from https://openweathermap.org/api",
    });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather`;
    const response = await axios.get(url, {
      params: {
        q: city.trim(),
        appid: API_KEY,
        units: "metric", // Celsius
      },
    });

    const data = response.data;

    // Build structured response
    const weatherData = {
      success: true,
      city: data.name,
      country: data.sys.country,
      current_temperature: {
        celsius: data.main.temp,
        fahrenheit: parseFloat(((data.main.temp * 9) / 5 + 32).toFixed(2)),
        feels_like_celsius: data.main.feels_like,
      },
      weather_condition: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      },
      humidity: `${data.main.humidity}%`,
      wind: {
        speed_kmh: parseFloat((data.wind.speed * 3.6).toFixed(2)),
        speed_ms: data.wind.speed,
      },
      visibility_km: (data.visibility / 1000).toFixed(1),
      pressure_hPa: data.main.pressure,
      timestamp: new Date().toISOString(),
    };

    res.json(weatherData);
  } catch (error) {
    // Handle specific OpenWeather API errors
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message;

      if (status === 404) {
        return res.status(404).json({
          success: false,
          error: `City "${city}" not found. Please check the city name and try again.`,
        });
      }

      if (status === 401) {
        return res.status(401).json({
          success: false,
          error: "Invalid API key. Please check your OPENWEATHER_API_KEY in .env file.",
        });
      }

      return res.status(status).json({
        success: false,
        error: message || "Weather API error occurred",
      });
    }

    // Network or other errors
    res.status(500).json({
      success: false,
      error: "Failed to fetch weather data. Please check your internet connection.",
    });
  }
};
