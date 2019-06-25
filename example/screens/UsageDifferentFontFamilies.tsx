import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import ScreenProps from './index';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const MultiFontFamilyHeaderButton = props => (
  <HeaderButton {...props} IconComponent={props.MyIconComponent} iconSize={23} color="blue" />
);

export class UsageDifferentFontFamilies extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Font families',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={MultiFontFamilyHeaderButton}>
        <Item
          title="settings-ion"
          MyIconComponent={Ionicons}
          iconName="ios-settings"
          onPress={() => alert('ionicons settings')}
        />
        <Item
          title="settings-mat"
          MyIconComponent={MaterialIcons}
          iconName="settings"
          onPress={() => alert('material settings')}
        />
      </HeaderButtons>
    ),
  };

  render() {
    return <View />;
  }
}
