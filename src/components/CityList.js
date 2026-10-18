import { Pressable, StyleSheet, Text, View } from 'react-native';

// A list of cities, used for both search results and favourites.
// `onRemove` is optional: when given, each row gets a "Remove" button.
export default function CityList({ title, cities, onSelect, onRemove }) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      {cities.map((city) => (
        <View key={city.id} style={styles.row}>
          <Pressable
            style={styles.city}
            onPress={() => onSelect(city)}
            accessibilityRole="button"
            accessibilityLabel={`Show weather for ${city.name}`}
          >
            <Text style={styles.name}>{city.name}</Text>
            {city.region ? <Text style={styles.region}>{city.region}</Text> : null}
          </Pressable>
          {onRemove ? (
            <Pressable
              onPress={() => onRemove(city)}
              accessibilityRole="button"
              accessibilityLabel={`Remove ${city.name} from favourites`}
              hitSlop={8}
            >
              <Text style={styles.remove}>Remove</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
  },
  city: {
    flex: 1,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
    color: '#111827',
  },
  region: {
    fontSize: 13,
    color: '#6b7280',
  },
  remove: {
    color: '#dc2626',
    fontSize: 14,
  },
});
