export function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

/** Formats a °C value for display in the chosen unit: formatTemperature(21.6, 'F') -> "71°F" */
export function formatTemperature(celsius, unit = 'C') {
  const value = unit === 'F' ? celsiusToFahrenheit(celsius) : celsius;
  return `${Math.round(value)}°${unit}`;
}
