# WeatherNow ☀️

A small weather app for Android and iOS, built with [Expo](https://expo.dev) and React Native.

- Search for any city in the world
- See the current temperature, conditions, humidity and wind
- Tap the temperature to switch between °C and °F
- Save favourite cities (they stay saved after you close the app)

Weather data comes from [Open-Meteo](https://open-meteo.com), a free API that needs no account or API key.

> This project is also a learning project. See **[docs/LEARNING_PATH.md](docs/LEARNING_PATH.md)** for step-by-step exercises covering Git, debugging, testing, APIs, CI and deployment.

## Run it on your computer

You need [Node.js](https://nodejs.org) (the LTS version) and the **Expo Go** app on your phone (Play Store / App Store).

```bash
npm install      # download the libraries the app uses (first time only)
npm start        # start the development server
```

A QR code appears in the terminal. Scan it with Expo Go (Android) or the Camera app (iPhone). Your phone and computer must be on the same Wi-Fi.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Starts the app in development mode |
| `npm test` | Runs all automated tests once |
| `npm run test:watch` | Re-runs tests every time you save a file |
| `npm run lint` | Checks the code for common mistakes |

## Project structure

```
App.js                    The main screen: holds the app's state and connects everything
src/
  api/weather.js          Calls the Open-Meteo APIs
  components/             Pieces of the screen (search bar, weather card, city list)
  storage/favorites.js    Saves favourite cities on the phone
  utils/                  Small helper functions (temperature formatting, weather codes)
  config.js               Settings read from environment variables
__tests__/                Automated tests (Jest + React Native Testing Library)
.github/workflows/ci.yml  Runs lint and tests on GitHub for every pull request
eas.json                  Settings for building installable apps with EAS
```

## License

MIT
