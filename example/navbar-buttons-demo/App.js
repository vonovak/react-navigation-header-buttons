import {
  UsageCustom,
  UsageWithIcons,
  UsageWithOverflow,
  UsageLeft,
  UsageDisabled,
  UsageCustomRipple,
  UsageDifferentFontFamilies,
  HomeScreen,
  UsageWithCustomOverflow,
} from './screens';
import { StackNavigator } from 'react-navigation';
import React from 'react';

// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const RootStack = StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  UsageWithIcons: {
    screen: UsageWithIcons,
  },
  UsageLeft: {
    screen: UsageLeft,
  },
  UsageCustom: {
    screen: UsageCustom,
  },
  UsageDisabled: {
    screen: UsageDisabled,
  },
  UsageCustomRipple: {
    screen: UsageCustomRipple,
  },
  UsageWithOverflow: {
    screen: UsageWithOverflow,
  },
  UsageDifferentFontFamilies: {
    screen: UsageDifferentFontFamilies,
  },
  UsageWithCustomOverflow: {
    screen: UsageWithCustomOverflow,
  },
});

const App = () => (
  <ActionSheetProvider>
    <RootStack />
  </ActionSheetProvider>
);

export default App;
