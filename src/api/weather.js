// Talks to the free Open-Meteo APIs (https://open-meteo.com). No API key needed.
import { FORECAST_URL, GEOCODING_URL } from '../config';

/**
 * Finds cities matching a name, e.g. "Hyderabad".
 * Returns up to 5 matches: [{ id, name, region, latitude, longitude }]
 */
export async function searchCities(name) {
  const query = name.trim();
  if (!query) {
    return [];
  }

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const data = await getJson(url);

  // The API leaves out `results` entirely when nothing matches.
  return (data.results ?? []).map((place) => ({
    id: place.id,
    name: place.name,
    region: [place.admin1, place.country].filter(Boolean).join(', '),
    latitude: place.latitude,
    longitude: place.longitude,
  }));
}

/**
 * Gets the current weather at a location.
 * Temperatures are in °C and wind speed in km/h.
 */
export async function getCurrentWeather(latitude, longitude) {
  const fields = 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m';
  const url = `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=${fields}`;
  const { current } = await getJson(url);

  return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    code: current.weather_code,
  };
}

// Fetches a URL and turns network or server problems into readable errors.
async function getJson(url) {
  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Could not connect. Check your internet connection and try again.');
  }

  if (!response.ok) {
    throw new Error(`Weather service error (${response.status}). Please try again later.`);
  }
  return response.json();
}
