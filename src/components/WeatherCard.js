import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatTemperature } from '../utils/format';
import { describeWeather } from '../utils/weatherCodes';

export default function WeatherCard({ city, weather, unit, isFavorite, onToggleFavorite, onToggleUnit }) {
  const { label, emoji } = describeWeather(weather.code);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.place}>
          <Text style={styles.city}>{city.name}</Text>
          {city.region ? <Text style={styles.region}>{city.region}</Text> : null}
        </View>
        <Pressable
          onPress={onToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          hitSlop={8}
        >
          <Text style={styles.star}>{isFavorite ? '★' : '☆'}</Text>
        </Pressable>
      </View>

      <Text style={styles.emoji}>{emoji}</Text>
      <Pressable onPress={onToggleUnit} accessibilityRole="button" accessibilityHint="Switches between °C and °F">
        <Text style={styles.temperature}>{formatTemperature(weather.temperature, unit)}</Text>
      </Pressable>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.details}>
        <Detail name="Feels like" value={formatTemperature(weather.feelsLike, unit)} />
        <Detail name="Humidity" value={`${weather.humidity}%`} />
        <Detail name="Wind" value={`${Math.round(weather.windSpeed)} km/h`} />
      </View>
    </View>
  );
}

function Detail({ name, value }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailValue}>{value}</Text>
      <Text style={styles.detailName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },
  place: {
    flex: 1,
  },
  city: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  region: {
    fontSize: 14,
    color: '#6b7280',
  },
  star: {
    fontSize: 28,
    color: '#f59e0b',
  },
  emoji: {
    fontSize: 64,
    marginTop: 8,
  },
  temperature: {
    fontSize: 56,
    fontWeight: '300',
    color: '#111827',
  },
  label: {
    fontSize: 18,
    color: '#374151',
  },
  details: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  detail: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  detailName: {
    fontSize: 12,
    color: '#6b7280',
  },
});
