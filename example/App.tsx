import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens();
import {
  UsageCustom,
  UsageWithIcons,
  UsageWithOverflow,
  UsageLeft,
  UsageDisabled,
  UsageDifferentFontFamilies,
  HomeScreen,
  UsageWithCustomOverflow,
  UsageWithOverflowComplex,
} from './screens';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, ThemeProvider } from './ThemeProvider';
// import { createNativeStackNavigator as createStackNavigator } from 'react-native-screens/native-stack';

const screens = {
  HomeScreen,
  UsageWithIcons,
  UsageWithOverflowComplex,
  UsageLeft,
  UsageCustom,
  UsageDisabled,
  UsageWithOverflow,
  UsageDifferentFontFamilies,
  UsageWithCustomOverflow,
};

const Stack = createStackNavigator();

const Body = () => {
  // console.warn('render');
  return (
    <>
      <StatusBar style="light" backgroundColor="lightgreen" />
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

const ThemedApp = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <ActionSheetProvider>
        <OverflowMenuProvider>
          <Body />
        </OverflowMenuProvider>
      </ActionSheetProvider>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
