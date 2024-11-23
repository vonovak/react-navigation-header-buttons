import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons/HeaderButtonsProvider';
// import { HeaderButtonsProviderDropdownMenu } from 'react-navigation-header-buttons/HeaderButtonsProviderDropdownMenu';
// just for custom overflow menu onPress action
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext, ThemeProvider } from './ThemeProvider';
import { screens } from './NavTypes';
import { TabScreenWithButtons } from './screens/TabScreenWithButtons';
import { createNativeStackNavigator as createStackNavigator } from '@react-navigation/native-stack';
const stackType = 'native';
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="darkgreen" />
        <ActionSheetProvider>
          <HeaderButtonsProvider stackType={stackType}>
            <TabbedApp />
          </HeaderButtonsProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
function Fallback({ error }: { error: Error }) {
  return (
    <View>
      <Text>Something went wrong:</Text>
      <Text style={{ color: 'red' }}>{error?.message}</Text>
    </View>
  );
}
