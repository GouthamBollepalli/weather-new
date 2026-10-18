import AsyncStorage from '@react-native-async-storage/async-storage';

import { addFavorite, loadFavorites, removeFavorite } from '../src/storage/favorites';

const london = { id: 1, name: 'London' };
const paris = { id: 2, name: 'Paris' };

beforeEach(async () => {
  await AsyncStorage.clear();
});

test('starts with no favourites', async () => {
  expect(await loadFavorites()).toEqual([]);
});

test('adds favourites and keeps them saved', async () => {
  await addFavorite(london);
  await addFavorite(paris);
  expect(await loadFavorites()).toEqual([london, paris]);
});

test('does not add the same city twice', async () => {
  await addFavorite(london);
  await addFavorite(london);
  expect(await loadFavorites()).toEqual([london]);
});

test('removes a favourite', async () => {
  await addFavorite(london);
  await addFavorite(paris);
  expect(await removeFavorite(london.id)).toEqual([paris]);
});
