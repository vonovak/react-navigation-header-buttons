// see https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
// to transform mockSafeAreaContext
const packagesToTransformWithBabel = [
  '@react-native',
  'react-native',
  'react-navigation',
];

const transformIgnorePatterns = [
  `<rootDir>/node_modules/(?!(${packagesToTransformWithBabel.join('|')}))`,
];

module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  transformIgnorePatterns,
  testPathIgnorePatterns: [
    '<rootDir>/(?:.+?)/__tests__/_(?:.+?)', //ignore files prepended with underscore
  ],
  maxWorkers: 2,
  setupFiles: ['<rootDir>/jest.setup.js'],
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\\.png$':
      '<rootDir>/node_modules/react-native/Libraries/Image/RelativeImageStub',
  },
};
