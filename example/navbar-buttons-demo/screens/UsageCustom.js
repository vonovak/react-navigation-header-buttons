import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import HeaderButtons from 'react-navigation-header-buttons';

@withNavigation
export class UsageCustom extends React.Component {
  static navigationOptions = {
    title: 'Custom Usage',
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.Item
          title="add"
          buttonWrapperStyle={{ marginTop: 10 }}
          IconElement={<Ionicons name="ios-add" size={23} />}
          onPress={() => console.warn('add')}
        />
        <HeaderButtons.Item
          title="edit"
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => console.warn('edit')}
        />
      </HeaderButtons>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <HeaderButtons>
        <HeaderButtons.Item
          title="add"
          buttonWrapperStyle={{ marginTop: 10 }}
          IconElement={<Ionicons name="ios-add" size={23} />}
          onPress={() => console.warn('add')}
        />
        <HeaderButtons.Item
          title="edit"
          buttonWrapperStyle={{ marginTop: -10 }}
          onPress={() => console.warn('edit')}
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
