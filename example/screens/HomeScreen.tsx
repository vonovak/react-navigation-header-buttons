import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from './PaddedButton';
import { ScreenProps } from 'react-navigation';

export class HomeScreen extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Header Buttons demo',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text style={{ margin: 15 }}>Explore possible usages with:</Text>
          <Button onPress={() => this._navigateTo('UsageWithIcons')} title="Vector icons" />
          <Button
            onPress={() => this._navigateTo('UsageWithOverflow')}
            title="Default overflow menu"
          />
          <Button
            onPress={() => this._navigateTo('UsageWithCustomOverflow')}
            title="Custom overflow menu action"
          />
          {/* <Button
            onPress={() => this._navigateTo('UsageWithCustomOverflow2')}
            title="Overflow menu from react-native-paper"
          /> */}
          <Button
            onPress={() => this._navigateTo('UsageCustomRipple')}
            title="Custom ripple (android only)"
          />
          <Button
            onPress={() => this._navigateTo('UsageDifferentFontFamilies')}
            title="Different font families in one menu"
          />
          <Button onPress={() => this._navigateTo('UsageDisabled')} title="Disabled state" />
          <Button
            onPress={() => this._navigateTo('UsageLeft')}
            title="On the left side of header"
          />
          <Button onPress={() => this._navigateTo('UsageCustom')} title="Custom elements" />
        </ScrollView>
      </View>
    );
  }

  _navigateTo = (destinationScreen: string) => {
    this.props.navigation.navigate(destinationScreen);
  };
}
