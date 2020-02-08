module.exports = {
  preset: 'react-native',
  // modulePathIgnorePatterns: ['<rootDir>/example/node_modules'],
  transform: {
    '^.+\\.js|.tsx$': require.resolve('react-native/jest/preprocessor.js'),
  },
};
