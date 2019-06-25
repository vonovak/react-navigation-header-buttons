const path = require('path');

// const reactNativeLib = path.resolve(__dirname, '..');

module.exports = {
  watchFolders: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '..'),
    // path.resolve(__dirname, '..', 'node_modules'),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    providesModuleNodeModules: [
      'react-native',
      'react',
      'react-native-platform-touchable',
      '@babel/runtime',
    ],
  },
};
