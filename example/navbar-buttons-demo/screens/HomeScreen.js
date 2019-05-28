//@flow
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from './PaddedButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type ScreenProps from './index';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const MultiFontFamilyHeaderButton = props => (
  <HeaderButton {...props} IconComponent={props.MyIconComponent} iconSize={23} color="blue" />
);

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

  _navigateTo = destinationScreen => {
    this.props.navigation.navigate(destinationScreen);
  };
}
