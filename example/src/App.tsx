import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext, ThemeProvider } from './ThemeProvider';
import { screens } from './NavTypes';
import { createStackNavigator } from '@react-navigation/stack';
const stackType = 'js';
// import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
// const stackType = 'native';

const Stack = createStackNavigator();

const Body = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="darkgreen" />
      {/*@ts-ignore*/}
      <Stack.Navigator>
        {Object.keys(screens).map((screenName) => {
          return (
            <Stack.Screen
              name={screenName}
              key={screenName}
              // @ts-ignore
              component={screens[screenName]}
            />
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
        <HeaderButtonsProvider stackType={stackType}>
          <Body />
        </HeaderButtonsProvider>
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
