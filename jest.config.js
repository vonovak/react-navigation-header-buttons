module.exports = {
  preset: 'react-native',
  // modulePathIgnorePatterns: ['<rootDir>/example/node_modules'],
  // transform: {
  //   '^.+\\.js|.tsx$': require.resolve('react-native/jest/preprocessor.js'),
  // },
  // setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  maxWorkers: 2,
  coverageProvider: 'v8',
  moduleNameMapper: {
    // '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[./a-zA-Z0-9$_-]+\\.png$':
      '<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub',
    // 'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
  },
};
