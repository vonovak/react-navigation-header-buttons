import React, { useContext } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from './PaddedButton';
import { ThemeContext } from '../ThemeProvider';

export function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Header Buttons demo',
      headerLargeTitle: true,
    });
  }, [navigation]);
  const _navigateTo = (destinationScreen: string) => {
    navigation.navigate(destinationScreen);
  };
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{ margin: 15 }}>Explore possible usages with:</Text>
        <Button onPress={() => _navigateTo('UsageWithIcons')} title="Vector icons" />
        <Button onPress={() => _navigateTo('UsageWithOverflow')} title="Default overflow menu" />
        <Button
          onPress={() => _navigateTo('UsageWithCustomOverflow')}
          title="Custom overflow menu action"
        />
        <Button
          onPress={() => _navigateTo('UsageWithOverflowComplex')}
          title="Overflow menu - all handlers"
        />
        <Button
          onPress={() => _navigateTo('UsageDifferentFontFamilies')}
          title="Different font families in one menu"
        />
        <Button onPress={() => _navigateTo('UsageDisabled')} title="Disabled state" />
        <Button onPress={() => _navigateTo('UsageLeft')} title="On the left side of header" />
        <Button onPress={() => _navigateTo('UsageCustom')} title="Custom elements" />
        <Button onPress={toggleTheme} title="Toggle Theme (ripple, text and icon color changes)" />
      </ScrollView>
    </View>
  );
}
