//@flow
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type ScreenProps from './index';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const DisableableHeaderButton = props => (
  <HeaderButton
    {...props}
    onPress={props.disabled ? undefined : props.onPress}
    buttonStyle={props.disabled ? { color: 'grey' } : undefined}
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
  />
);

export class UsageDisabled extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Disableable',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={DisableableHeaderButton}>
        <Item title="search" iconName="ios-search" onPress={() => alert('search')} disabled />
        <Item title="select" onPress={() => alert('select')} />
      </HeaderButtons>
    ),
  };

  render() {
    return <View />;
  }
}
