import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar({ onSearch, disabled }) {
  const [query, setQuery] = useState('');
  const canSearch = query.trim().length > 0 && !disabled;

  function submit() {
    if (canSearch) {
      onSearch(query);
    }
  }

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={submit}
        placeholder="Search for a city"
        accessibilityLabel="City name"
        returnKeyType="search"
        autoCorrect={false}
      />
      <Pressable
        style={[styles.button, !canSearch && styles.buttonDisabled]}
        onPress={submit}
        disabled={!canSearch}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d0d7e2',
  },
  button: {
    backgroundColor: '#2f6fed',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9db6ec',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
