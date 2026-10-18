// Saves favourite cities on the phone with AsyncStorage, so they are still
// there after the app is closed. AsyncStorage only stores text, so the list
// is converted to JSON before saving.
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'weather-now:favorites';

export async function loadFavorites() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // Unreadable data shouldn't crash the app; start with an empty list.
    return [];
  }
}

export async function addFavorite(city) {
  const favorites = await loadFavorites();
  if (favorites.some((favorite) => favorite.id === city.id)) {
    return favorites;
  }
  return saveFavorites([...favorites, city]);
}

export async function removeFavorite(cityId) {
  const favorites = await loadFavorites();
  return saveFavorites(favorites.filter((favorite) => favorite.id !== cityId));
}

async function saveFavorites(favorites) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites;
}
