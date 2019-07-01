import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import ScreenProps from './index';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import Touchable from 'react-native-platform-touchable';

const DisableableHeaderButton = props => (
  <HeaderButton
    {...props}
    background={Touchable.Ripple('red', true)}
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
  />
);

export class UsageCustomRipple extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Ripple',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={DisableableHeaderButton}>
        <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
        <Item title="select" onPress={() => alert('select')} />
      </HeaderButtons>
    ),
  };

  render() {
    return <View />;
  }
}
