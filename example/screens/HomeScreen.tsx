import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from './PaddedButton';

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
          onPress={() => _navigateTo('UsageCustomRipple')}
          title="Custom ripple (android only)"
        />
        <Button
          onPress={() => _navigateTo('UsageDifferentFontFamilies')}
          title="Different font families in one menu"
        />
        <Button onPress={() => _navigateTo('UsageDisabled')} title="Disabled state" />
        <Button onPress={() => _navigateTo('UsageLeft')} title="On the left side of header" />
        <Button onPress={() => _navigateTo('UsageCustom')} title="Custom elements" />
      </ScrollView>
    </View>
  );
}
