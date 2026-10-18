// Settings that can change between environments (development, production).
//
// Expo reads variables that start with EXPO_PUBLIC_ from a `.env` file and
// builds them into the app. Copy `.env.example` to `.env` to override them.
//
// IMPORTANT: anything in EXPO_PUBLIC_ variables ends up inside the app that
// users download, so never put passwords or secret keys here.

export const GEOCODING_URL =
  process.env.EXPO_PUBLIC_GEOCODING_URL ?? 'https://geocoding-api.open-meteo.com/v1/search';

export const FORECAST_URL =
  process.env.EXPO_PUBLIC_FORECAST_URL ?? 'https://api.open-meteo.com/v1/forecast';
