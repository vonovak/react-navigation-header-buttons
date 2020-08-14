import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens();
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
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator as createStackNavigator } from 'react-native-screens/native-stack';

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
    <>
      <StatusBar barStyle="light-content" backgroundColor="lightgreen" />
      <Stack.Navigator>
        {Object.keys(screens).map((screenName) => {
          return (
            <Stack.Screen name={screenName} key={screenName} component={screens[screenName]} />
          );
        })}
      </Stack.Navigator>
    </>
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
