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
  UsageWithCustomOverflow2,
} from './screens';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const RootStack = createStackNavigator({
  HomeScreen,
  UsageWithIcons,
  UsageLeft,
  UsageCustom,
  UsageDisabled,
  UsageCustomRipple,
  UsageWithOverflow,
  UsageDifferentFontFamilies,
  UsageWithCustomOverflow,
  UsageWithCustomOverflow2,
});

const AppContainer = createAppContainer(RootStack);
const App = () => (
  <ActionSheetProvider>
    <AppContainer />
  </ActionSheetProvider>
);
export default App;
