import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons/HeaderButtonsProvider';
// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from 'expo-status-bar';
import { ThemeContext, ThemeProvider } from './ThemeProvider';
import { screens } from './NavTypes';
import { TabScreenWithButtons } from './screens/TabScreenWithButtons';
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
const stackType = 'native';
// import { createStackNavigator } from '@react-navigation/stack';
// const stackType = 'js';

const Stack = createStackNavigator();

const Body = () => {
  return (
    <>
      {/*@ts-ignore*/}
      <Stack.Navigator>
        {Object.keys(screens).map((screenName) => {
          return (
            <Stack.Screen
              name={screenName}
              key={screenName}
              // @ts-ignore
              component={screens[screenName]}
              options={
                {
                  // headerLargeTitle: true,
                }
              }
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
};

const Tab = createBottomTabNavigator();

function TabbedApp() {
  return (
    //@ts-ignore
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarIcon: () => null }}
    >
      <Tab.Screen name="Home" component={Body} />
      <Tab.Screen
        name="Settings"
        component={TabScreenWithButtons}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}

const ThemedApp = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="light" backgroundColor="darkgreen" />

      <ActionSheetProvider>
        <HeaderButtonsProvider stackType={stackType}>
          <TabbedApp />
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
