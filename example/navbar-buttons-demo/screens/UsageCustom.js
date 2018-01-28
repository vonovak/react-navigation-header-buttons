import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import NavHeader from 'react-navigation-header-buttons';

@withNavigation
export class UsageCustom extends React.Component {
  static navigationOptions = {
    title: 'Custom Usage',
    headerRight: (
      <NavHeader>
        <NavHeader.Item
          label="add"
          buttonWrapperStyle={{ marginTop: 10 }}
          IconElement={<Ionicons name="ios-add" size={23} />}
          onPress={() => console.warn('add')}
        />
        <NavHeader.Item
          label="edit"
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => console.warn('edit')}
        />
      </NavHeader>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <NavHeader>
        <NavHeader.Item
          label="add"
          buttonWrapperStyle={{ marginTop: 10 }}
          IconElement={<Ionicons name="ios-add" size={23} />}
          onPress={() => console.warn('add')}
        />
        <NavHeader.Item
          label="edit"
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => console.warn('edit')}
        />
      </NavHeader>
    ),
    `;

    return (
      <View>
        <Text>{text}</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="Go Back" />
      </View>
    );
  }
}
