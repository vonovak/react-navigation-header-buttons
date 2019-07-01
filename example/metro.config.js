const path = require('path');

module.exports = {
  watchFolders: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, '..')],
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
