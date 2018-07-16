//@flow
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderButtons, { Item } from 'react-navigation-header-buttons';
import type ScreenProps from './index';

export class UsageCustom extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Custom',
    headerRight: (
      <HeaderButtons>
        <Item
          title="shifted"
          buttonWrapperStyle={{ marginTop: 10 }}
          onPress={() => alert('misaligned')}
        />
        <Item
          title="add"
          ButtonElement={<View style={{ height: 25, width: 25, backgroundColor: 'green' }} />}
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => alert('green square')}
        />
      </HeaderButtons>
    ),
  };

  render() {
    return <View />;
  }
}
