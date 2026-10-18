import { celsiusToFahrenheit, formatTemperature } from '../src/utils/format';

describe('celsiusToFahrenheit', () => {
  test('converts freezing and boiling points', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  test('handles negative temperatures', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });
});

describe('formatTemperature', () => {
  test('shows Celsius by default, rounded', () => {
    expect(formatTemperature(21.6)).toBe('22°C');
  });

  test('converts to Fahrenheit when asked', () => {
    expect(formatTemperature(21.6, 'F')).toBe('71°F');
  });
});
