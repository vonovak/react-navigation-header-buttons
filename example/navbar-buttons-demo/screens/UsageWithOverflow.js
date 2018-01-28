import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavHeader from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageWithOverflow extends React.Component {
  static navigationOptions = {
    title: 'Usage With Overflow',
    headerRight: (
      <NavHeader IconComponent={MaterialIcons} size={23} color="blue">
        <NavHeader.Item label="person" iconName="person" onPress={() => console.warn('add')} />
        <NavHeader.Item label="edit" show="never" onPress={() => console.warn('edit')} />
      </NavHeader>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <NavHeader IconComponent={MaterialIcons} size={23} color="blue">
        <NavHeader.Item label="person" iconName="person" onPress={() => console.warn('add')} />
        <NavHeader.Item label="edit" show="never" onPress={() => console.warn('edit')} />
      </NavHeader>
    )
    `;
    return (
      <View>
        <Text>{text}</Text>
        <Button onPress={() => this.props.navigation.navigate('UsageLeft')} title="Usage Left" />
      </View>
    );
  }
}
