const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,
    // "exports": {
    //   ".": {
    //     "require": {
    //       "default": "./lib/commonjs/index.js"
    //     },
    //     "import": {
    //       "default": "./lib/module/index.js"
    //     },
    //     "react-native": "./src/index.ts"
    //   },
    //   "./menu": {
    //     "require": {
    //       "default": "./lib/commonjs/overflowMenu/vendor/index.js"
    //     },
    //     "import": {
    //       "default": "./lib/module/overflowMenu/vendor/index.js",
    //       "types": "./lib/typescript/overflowMenu/vendor/index.d.ts"
    //     },
    //     "react-native": "./src/index/menu/index.ts"
    //   }
    // },
    // unstable_enablePackageExports: true,

    blockList: exclusionList(
      modules.map(
        (m) =>
          new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
      )
    ),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};
module.exports = config;
