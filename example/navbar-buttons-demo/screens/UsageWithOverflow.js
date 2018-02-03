import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageWithOverflow extends React.Component {
  static navigationOptions = {
    title: 'Usage With Overflow',
    headerRight: (
      <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color="blue">
        <HeaderButtons.Item title="person" iconName="person" onPress={() => console.warn('add')} />
        <HeaderButtons.Item title="edit" show="never" onPress={() => console.warn('edit')} />
      </HeaderButtons>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <HeaderButtons IconComponent={MaterialIcons} iconSize={23} color="blue">
        <HeaderButtons.Item title="person" iconName="person" onPress={() => console.warn('add')} />
        <HeaderButtons.Item title="edit" show="never" onPress={() => console.warn('edit')} />
      </HeaderButtons>
    ),
    `;
    return (
      <View>
        <Text>{text}</Text>
        <Button onPress={() => this.props.navigation.navigate('UsageLeft')} title="Usage Left" />
      </View>
    );
  }
}
