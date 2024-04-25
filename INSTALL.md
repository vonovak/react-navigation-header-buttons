# Installation & Setup

Version >= 12 requires React Native 0.73 / Expo 50 or newer (because of `unstable_enablePackageExports`). Use version 11 if you're on older version of RN / Expo.

Version >= 11 requires React Native 0.71 / Expo 48 or newer. Use version 10 if you're on older version of RN / Expo.

0. In your `tsconfig.json`, make sure you have [`"moduleResolution": "NodeNext"`](https://www.typescriptlang.org/tsconfig#moduleResolution) set. This is required for TS to see the typings exported via [package.json `exports`](https://reactnative.dev/blog/2023/06/21/package-exports-support).

1. add [`unstable_enablePackageExports`](https://metrobundler.dev/docs/configuration/#unstable_enablepackageexports-experimental) to your metro config (in `metro.config.js`). This field will default to `true` in a future version of RN so don't need to worry about it. This allows us to do some bundle size savings.

```js
// if you use Expo:
const config = getDefaultConfig(__dirname);
// unstable_enablePackageExports: true,
config.resolver.unstable_enablePackageExports = true;
module.exports = config;

// if you use bare React Native:
const config = {
  resolver: {
    unstable_enablePackageExports: true,
  },
};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

2. `yarn add react-navigation-header-buttons`

3. Wrap your root component in a `HeaderButtons` Provider and pass the `stackType` prop (`'native' | 'js'`), as seen in [example's App.tsx](https://github.com/vonovak/react-navigation-header-buttons/blob/master/example/src/App.tsx).

There are 3 providers to choose from. You'll get an actionable warning if you don't use the right one. They are:

- `HeaderButtonsProvider` - the recommended one, which assumes you will use `overflowMenuPressHandlerDropdownMenu` on Android but not iOS (because that's the default behavior that the library ships with). Internally, this translates to `HeaderButtonsProviderDropdownMenu` on Android and `HeaderButtonsProviderPlain` on iOS.
- `HeaderButtonsProviderPlain` - use it if you're not planning to use `overflowMenuPressHandlerDropdownMenu` at all. It will shave a few kB off your bundle and Hermes won't have to parse some code that would not run in the end.
- `HeaderButtonsProviderDropdownMenu` - use it if you're planning to use `overflowMenuPressHandlerDropdownMenu` on all platforms.

Importing: `import { your_chosen_provider } from 'react-navigation-header-buttons/your_chosen_provider'`.

> [!IMPORTANT]
> The Provider must be placed as a descendant of `NavigationContainer`, otherwise this library will not receive the correct theme from React Navigation.
