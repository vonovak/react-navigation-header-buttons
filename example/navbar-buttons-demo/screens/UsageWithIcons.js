//@flow
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type ScreenProps from './index';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';

const IoniconsHeaderButton = props => (
  // the `props` here come from <Item .../>
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);

export class UsageWithIcons extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Vector Icons',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        {/* use Item or HeaderButtons.Item */}
        <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
        <HeaderButtons.Item title="select" onPress={() => alert('select')} />
      </HeaderButtons>
    ),
  };

  render() {
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
      </View>
    );
  }
}
