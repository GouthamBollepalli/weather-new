import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, screen, userEvent } from '@testing-library/react-native';

import App from '../App';
import { getCurrentWeather, searchCities } from '../src/api/weather';

// Replace the real API calls with fakes, so this test only checks the screen.
jest.mock('../src/api/weather');

const hyderabad = { id: 1, name: 'Hyderabad', region: 'Telangana, India', latitude: 17.38, longitude: 78.46 };

beforeEach(async () => {
  await AsyncStorage.clear();
  searchCities.mockResolvedValue([hyderabad]);
  getCurrentWeather.mockResolvedValue({ temperature: 30.2, feelsLike: 33.1, humidity: 58, windSpeed: 11.4, code: 2 });
});

test('searching for a city and opening it shows its weather', async () => {
  const user = userEvent.setup();
  await render(<App />);

  await user.type(screen.getByLabelText('City name'), 'Hyderabad');
  await user.press(screen.getByRole('button', { name: 'Go' }));
  await user.press(await screen.findByLabelText('Show weather for Hyderabad'));

  expect(await screen.findByText('30°C')).toBeOnTheScreen();
  expect(screen.getByText('Partly cloudy')).toBeOnTheScreen();

  // Tapping the temperature switches to Fahrenheit.
  await user.press(screen.getByText('30°C'));
  expect(screen.getByText('86°F')).toBeOnTheScreen();
});

test('a city can be added to favourites', async () => {
  const user = userEvent.setup();
  await render(<App />);

  await user.type(screen.getByLabelText('City name'), 'Hyderabad');
  await user.press(screen.getByRole('button', { name: 'Go' }));
  await user.press(await screen.findByLabelText('Show weather for Hyderabad'));
  await user.press(await screen.findByLabelText('Add to favourites'));

  expect(await screen.findByText('Favourites')).toBeOnTheScreen();
  expect(screen.getByLabelText('Remove from favourites')).toBeOnTheScreen();
});

test('shows a message when no city matches', async () => {
  searchCities.mockResolvedValue([]);
  const user = userEvent.setup();
  await render(<App />);

  await user.type(screen.getByLabelText('City name'), 'Nowhereville');
  await user.press(screen.getByRole('button', { name: 'Go' }));

  expect(await screen.findByText('No cities found for "Nowhereville".')).toBeOnTheScreen();
});
