import { describeWeather } from '../src/utils/weatherCodes';

test('describes a known weather code', () => {
  expect(describeWeather(0)).toEqual({ label: 'Clear sky', emoji: '☀️' });
  expect(describeWeather(95)).toEqual({ label: 'Thunderstorm', emoji: '⛈️' });
});

test('falls back to "Unknown" for codes it does not know', () => {
  expect(describeWeather(1234)).toEqual({ label: 'Unknown', emoji: '❓' });
});
