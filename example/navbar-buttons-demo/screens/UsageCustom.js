//@flow
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import HeaderButtons from 'react-navigation-header-buttons';
import type ScreenProps from './index';

@withNavigation
export class UsageCustom extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Custom Usage',
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.Item
          title="disabled"
          buttonWrapperStyle={{ marginTop: 10, opacity: 0.5 }}
          onPress={undefined}
        />
        <HeaderButtons.Item
          title="add"
          IconElement={<Ionicons name="ios-add" size={23} />}
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => alert('add')}
        />
      </HeaderButtons>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.Item
          title="disabled"
          buttonWrapperStyle={{ marginTop: 10, opacity: 0.5 }}
          onPress={undefined}
        />
        <HeaderButtons.Item
          title="add"
          IconElement={<Ionicons name="ios-add" size={23} />}
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => alert('add')}
        />
      </HeaderButtons>
    )
    `;

    return (
      <View>
        <Text>{text}</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
