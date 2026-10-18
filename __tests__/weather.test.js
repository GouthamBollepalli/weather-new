import { getCurrentWeather, searchCities } from '../src/api/weather';

// Tests must not depend on the real internet, so `fetch` is replaced with a
// fake that returns whatever each test needs.
function mockFetchResponse(body, { ok = true, status = 200 } = {}) {
  global.fetch = jest.fn().mockResolvedValue({ ok, status, json: () => Promise.resolve(body) });
}

afterEach(() => {
  delete global.fetch;
});

describe('searchCities', () => {
  test('returns simplified city results', async () => {
    mockFetchResponse({
      results: [
        { id: 1, name: 'Hyderabad', admin1: 'Telangana', country: 'India', latitude: 17.38, longitude: 78.46 },
      ],
    });

    const cities = await searchCities('  Hyderabad ');

    expect(cities).toEqual([
      { id: 1, name: 'Hyderabad', region: 'Telangana, India', latitude: 17.38, longitude: 78.46 },
    ]);
    expect(global.fetch.mock.calls[0][0]).toContain('name=Hyderabad');
  });

  test('returns an empty list when nothing matches', async () => {
    mockFetchResponse({});
    expect(await searchCities('Nowhereville')).toEqual([]);
  });

  test('does not call the API for an empty search', async () => {
    global.fetch = jest.fn();
    expect(await searchCities('   ')).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('throws a readable error when the server fails', async () => {
    mockFetchResponse({}, { ok: false, status: 500 });
    await expect(searchCities('London')).rejects.toThrow('Weather service error (500)');
  });

  test('throws a readable error when offline', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('Network request failed'));
    await expect(searchCities('London')).rejects.toThrow('Check your internet connection');
  });
});

describe('getCurrentWeather', () => {
  test('returns the current conditions', async () => {
    mockFetchResponse({
      current: {
        temperature_2m: 30.2,
        apparent_temperature: 33.1,
        relative_humidity_2m: 58,
        weather_code: 2,
        wind_speed_10m: 11.4,
      },
    });

    const weather = await getCurrentWeather(17.38, 78.46);

    expect(weather).toEqual({ temperature: 30.2, feelsLike: 33.1, humidity: 58, windSpeed: 11.4, code: 2 });
    expect(global.fetch.mock.calls[0][0]).toContain('latitude=17.38&longitude=78.46');
  });
});
