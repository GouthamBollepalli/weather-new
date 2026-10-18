// Runs before every test file.

// AsyncStorage needs a real phone. In tests, use the in-memory fake that the
// library provides instead.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
