# Lab 13 - API RESTful Deployment and Testing
## Task 7.1: Weather Forecast API | Task 7.2: News Headlines API

---

## STEP-BY-STEP SETUP INSTRUCTIONS

---

## STEP 1 — Install Node.js (if not already installed)

Download and install from: https://nodejs.org (choose LTS version)

Verify installation:
```
node -v
npm -v
```

---

## STEP 2 — Get Your FREE API Keys

### Weather API Key (OpenWeatherMap):
1. Go to: https://openweathermap.org/api
2. Click "Sign Up" → Create a free account
3. Go to your Profile → "My API Keys"
4. Copy your default API key (it activates within 10-15 minutes)

### News API Key (NewsAPI):
1. Go to: https://newsapi.org/register
2. Register for a free account
3. Your API key appears on the dashboard immediately

---

## STEP 3 — Set Up Weather API (Task 7.1)

Open a terminal and run:

```bash
cd weather-api
npm install
```

Open the `.env` file and replace `your_openweather_api_key_here` with your actual key:
```
PORT=5001
OPENWEATHER_API_KEY=abc123yourkeyhere
```

Start the server:
```bash
npm run dev
```

You should see:
```
Weather API running on http://localhost:5001
Test it: http://localhost:5001/api/weather/Islamabad
```

---

## STEP 4 — Test Weather API

### In Browser:
| Test | URL |
|------|-----|
| Welcome | http://localhost:5001 |
| Islamabad | http://localhost:5001/api/weather/Islamabad |
| Karachi | http://localhost:5001/api/weather/Karachi |
| London | http://localhost:5001/api/weather/London |
| Invalid city | http://localhost:5001/api/weather/xyzinvalidcity |

### In Postman:
- Method: GET
- URL: `http://localhost:5001/api/weather/Islamabad`
- No headers needed
- Click Send

### Expected Successful Response:
```json
{
  "success": true,
  "city": "Islamabad",
  "country": "PK",
  "current_temperature": {
    "celsius": 28.5,
    "fahrenheit": 83.3,
    "feels_like_celsius": 30.1
  },
  "weather_condition": {
    "main": "Clouds",
    "description": "scattered clouds",
    "icon": "https://openweathermap.org/img/wn/03d@2x.png"
  },
  "humidity": "60%",
  "wind": {
    "speed_kmh": 14.4,
    "speed_ms": 4.0
  },
  "visibility_km": "10.0",
  "pressure_hPa": 1013,
  "timestamp": "2025-01-01T10:00:00.000Z"
}
```

### Expected Error Response (invalid city):
```json
{
  "success": false,
  "error": "City \"xyzinvalidcity\" not found. Please check the city name and try again."
}
```

---

## STEP 5 — Set Up News API (Task 7.2)

Open a NEW terminal window and run:

```bash
cd news-api
npm install
```

Open the `.env` file and replace `your_newsapi_key_here` with your actual key:
```
PORT=5002
NEWS_API_KEY=abc123yourkeyhere
```

Start the server:
```bash
npm run dev
```

You should see:
```
News API running on http://localhost:5002
Test it: http://localhost:5002/api/news/us
```

---

## STEP 6 — Test News API

### In Browser:
| Test | URL |
|------|-----|
| Welcome | http://localhost:5002 |
| Pakistan news | http://localhost:5002/api/news/pk |
| US news | http://localhost:5002/api/news/us |
| UK news | http://localhost:5002/api/news/gb |
| Invalid code | http://localhost:5002/api/news/xyz |

### In Postman:
- Method: GET
- URL: `http://localhost:5002/api/news/pk`
- No headers needed
- Click Send

### Expected Successful Response:
```json
{
  "success": true,
  "country_code": "PK",
  "total_results": 38,
  "showing": 10,
  "fetched_at": "2025-01-01T10:00:00.000Z",
  "headlines": [
    {
      "index": 1,
      "title": "Breaking: Latest news headline here",
      "source": "Geo News",
      "url": "https://example.com/article",
      "published_at": "2025-01-01T09:00:00Z",
      "description": "Article description here..."
    }
  ]
}
```

### Expected Error Response (invalid country):
```json
{
  "success": false,
  "error": "\"xyz\" is not a valid country code.",
  "valid_examples": ["us", "pk", "gb", "in", "au", "ca", "de", "fr"]
}
```

---

## Supported Country Codes (News API)

| Code | Country |
|------|---------|
| pk | Pakistan |
| us | United States |
| gb | United Kingdom |
| in | India |
| ae | UAE |
| sa | Saudi Arabia |
| au | Australia |
| ca | Canada |
| de | Germany |
| fr | France |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| `Cannot find module 'express'` | Run `npm install` inside the project folder |
| `API key not configured` | Edit `.env` file and add your real API key |
| `401 Unauthorized` | Your API key is wrong or expired |
| `City not found` | Check spelling of city name |
| Port already in use | Change PORT in `.env` to another number (e.g., 5003) |
| Weather key not working | OpenWeather keys take up to 15 minutes to activate after signup |

---

## Project Structure

```
lab_13_api_restful_deployment_and_testing_lab/
│
├── weather-api/                  (Task 7.1)
│   ├── server.js                 ← Starts the server
│   ├── .env                      ← Your API key goes here
│   ├── package.json
│   ├── routes/
│   │   └── weatherRoutes.js      ← Defines GET /api/weather/:city
│   └── controllers/
│       └── weatherController.js  ← Fetches data from OpenWeather
│
└── news-api/                     (Task 7.2)
    ├── server.js                 ← Starts the server
    ├── .env                      ← Your API key goes here
    ├── package.json
    ├── routes/
    │   └── newsRoutes.js         ← Defines GET /api/news/:countryCode
    └── controllers/
        └── newsController.js     ← Fetches data from NewsAPI
```
