import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';

import { getCurrentWeather, searchCities } from './src/api/weather';
import CityList from './src/components/CityList';
import SearchBar from './src/components/SearchBar';
import WeatherCard from './src/components/WeatherCard';
import { addFavorite, loadFavorites, removeFavorite } from './src/storage/favorites';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved favourites once, when the app starts.
  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  async function handleSearch(query) {
    setError(null);
    setLoading(true);
    try {
      const cities = await searchCities(query);
      setSearchResults(cities);
      if (cities.length === 0) {
        setError(`No cities found for "${query.trim()}".`);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function showWeather(city) {
    setError(null);
    setSearchResults([]);
    setLoading(true);
    try {
      setWeather(await getCurrentWeather(city.latitude, city.longitude));
      setSelectedCity(city);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite() {
    if (isFavorite) {
      setFavorites(await removeFavorite(selectedCity.id));
    } else {
      setFavorites(await addFavorite(selectedCity));
    }
  }

  async function handleRemoveFavorite(city) {
    setFavorites(await removeFavorite(city.id));
  }

  const isFavorite = selectedCity !== null && favorites.some((city) => city.id === selectedCity.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>WeatherNow</Text>

      <SearchBar onSearch={handleSearch} disabled={loading} />

      {loading ? <ActivityIndicator size="large" style={styles.loading} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <CityList title="Results" cities={searchResults} onSelect={showWeather} />

      {weather && selectedCity ? (
        <WeatherCard
          city={selectedCity}
          weather={weather}
          unit={unit}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onToggleUnit={() => setUnit(unit === 'C' ? 'F' : 'C')}
        />
      ) : null}

      <CityList title="Favourites" cities={favorites} onSelect={showWeather} onRemove={handleRemoveFavorite} />

      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eef3fb',
  },
  content: {
    padding: 20,
    paddingTop: 64,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  loading: {
    marginVertical: 12,
  },
  error: {
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 10,
  },
});
