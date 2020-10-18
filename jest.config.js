module.exports = {
  preset: 'react-native',
  // modulePathIgnorePatterns: ['<rootDir>/example/node_modules'],
  transform: {
    '^.+\\.js|.tsx$': require.resolve('react-native/jest/preprocessor.js'),
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
};
