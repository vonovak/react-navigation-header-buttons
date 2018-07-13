//@flow
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import HeaderButtons, { Item } from 'react-navigation-header-buttons';
import type ScreenProps from './index';

@withNavigation
export class UsageCustom extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Alignment',
    headerRight: (
      <HeaderButtons>
        <Item
          title="shifted"
          buttonWrapperStyle={{ marginTop: 10 }}
          onPress={() => alert('misaligned')}
        />
        <Item
          title="add"
          ButtonElement={<Ionicons name="ios-add" size={23} />}
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => alert('add')}
        />
      </HeaderButtons>
    ),
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('UsageDisabled')}
          title="Usage with disabled state"
        />
      </View>
    );
  }
}
