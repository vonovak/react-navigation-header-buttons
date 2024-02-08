import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { ThemeContext } from '../ThemeProvider';
import type { ScreenProps } from '../NavTypes';
import { Button } from '../components/PaddedButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';

export function HomeScreen({ navigation }: ScreenProps<'HomeScreen'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Header Buttons demo',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="settings"
            iconName="settings"
            onPress={() => alert('settings')}
          />
          <Item
            title="search"
            iconName="search"
            onPress={() => alert('search')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const _navigateTo = (destinationScreen: any) => {
    navigation.navigate(destinationScreen);
  };
  const { toggleTheme } = React.useContext(ThemeContext);

  return (
    <ScrollView contentContainerStyle={{ rowGap: 10 }}>
      <Text style={{ margin: 15 }}>Explore possible usages with:</Text>
      <Button
        onPress={() => _navigateTo('UsageWithIcons')}
        title="Vector icons"
      />
      <Button
        onPress={() => _navigateTo('UsageWithOverflow')}
        title="Default overflow menu"
      />
      <Button
        onPress={() => _navigateTo('UsageWithCustomOverflow')}
        title="Custom overflow menu action"
      />
      <Button
        onPress={() => _navigateTo('UsageNativeMenu')}
        title="Native menu overflow"
      />
      <Button
        onPress={() => _navigateTo('UsageWithOverflowComplex')}
        title="Overflow menu - all handlers"
      />
      <Button
        onPress={() => _navigateTo('UsageDifferentFontFamilies')}
        title="Different font families in one menu"
      />
      <Button
        onPress={() => _navigateTo('UsageDisabled')}
        title="Disabled state"
      />
      <Button
        onPress={() => _navigateTo('UsageLeft')}
        title="On the left side of header"
      />
      <Button
        onPress={() => _navigateTo('UsageCustom')}
        title="Custom elements"
      />

      <Button
        onPress={toggleTheme}
        title="Toggle Theme (ripple, text and icon color changes)"
      />
    </ScrollView>
  );
}
