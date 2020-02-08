import 'react-native-gesture-handler';
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
  UsageWithOverflowComplex,
} from './screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const screens = {
  HomeScreen,
  UsageWithIcons,
  UsageWithOverflowComplex,
  UsageLeft,
  UsageCustom,
  UsageDisabled,
  UsageCustomRipple,
  UsageWithOverflow,
  UsageDifferentFontFamilies,
  UsageWithCustomOverflow,
};

const Stack = createStackNavigator();

const Body = () => {
  // console.warn('render');
  return (
    <Stack.Navigator>
      {Object.values(screens).map((screen) => {
        return <Stack.Screen name={screen.name} key={screen.name} component={screen} />;
      })}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <ActionSheetProvider>
        <OverflowMenuProvider>
          <Body />
        </OverflowMenuProvider>
      </ActionSheetProvider>
    </NavigationContainer>
  );
}
