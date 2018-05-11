//@flow
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';
import type ScreenProps from './index';

@withNavigation
export class UsageWithOverflow extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Usage With Overflow',
    headerRight: (
      <HeaderButtons
        IconComponent={MaterialIcons}
        OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
        iconSize={23}
        color="blue"
      >
        <HeaderButtons.Item title="person" iconName="person" onPress={() => alert('person')} />
        <HeaderButtons.Item title="edit" show="never" onPress={() => alert('edit')} />
      </HeaderButtons>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <HeaderButtons
        IconComponent={MaterialIcons}
        OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
        iconSize={23}
        color="blue"
      >
        <HeaderButtons.Item title="person" iconName="person" onPress={() => alert('person')} />
        <HeaderButtons.Item title="edit" show="never" onPress={() => alert('edit')} />
      </HeaderButtons>
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
