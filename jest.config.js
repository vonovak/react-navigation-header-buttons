module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/(?:.+?)/__tests__/_(?:.+?)', //ignore files prepended with underscore
  ],
  maxWorkers: 2,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\\.png$':
      '<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub',
  },
};
