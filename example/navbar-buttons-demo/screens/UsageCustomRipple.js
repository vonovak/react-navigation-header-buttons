//@flow
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type ScreenProps from './index';
import HeaderButtons, { HeaderButton } from 'react-navigation-header-buttons';
import Touchable from 'react-native-platform-touchable';

const DisableableHeaderButton = props => (
  <HeaderButton
    {...props}
    touchableBackground={Touchable.Ripple('red', true)}
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
  />
);

@withNavigation
export class CustomRipple extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Disableable',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={DisableableHeaderButton}>
        <HeaderButtons.Item
          title="search"
          iconName="ios-search"
          onPress={() => alert('search')}
          disabled
        />
        <HeaderButtons.Item title="select" onPress={() => alert('select')} />
      </HeaderButtons>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="blue">
        <HeaderButtons.Item title="search" iconName="ios-search" onPress={() => alert('search')} />
        <HeaderButtons.Item title="select" onPress={() => alert('select')} />
      </HeaderButtons>
    )
    `;
    return (
      <View>
        {/* <Icon.ToolbarAndroid
          style={{ height: 56, backgroundColor: 'grey' }}
          actions={[
            // { title: 'One', show: 'always' },
            { title: 'edit', show: 'always' },
            { title: 'add', show: 'always', iconName: 'ios-add' },
            // { title: 'Two', show: 'never',  },
          ]}
        /> */}
        <Text>{text}</Text>
      </View>
    );
  }
}
