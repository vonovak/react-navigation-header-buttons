import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavHeader from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageLeft extends React.Component {
  static navigationOptions = ({ navigation, navigation: { state } }) => ({
    title: 'Usage Left',
    headerLeft: (
      <NavHeader left IconComponent={MaterialIcons} size={23} color="blue">
        <NavHeader.Item
          label="Test"
          iconName={state.params && state.params.showIcon ? 'arrow-back' : undefined}
          onPress={() => console.warn('Test')}
        />
      </NavHeader>
    ),
    headerRight: (
      <NavHeader IconComponent={Ionicons} size={25} color="blue">
        <NavHeader.Item label="back" onPress={() => navigation.goBack()} />
      </NavHeader>
    ),
  });

  render() {
    const { navigation: { state } } = this.props;
    const text = `
    headerLeft: (
      <NavHeader left IconComponent={MaterialIcons} size={23} color="blue">
        <NavHeader.Item
          label="Test"
          iconName={state.params && state.params.showIcon ? 'arrow-back' : undefined}
          onPress={() => console.warn('Test')}
        />
      </NavHeader>
    )
    `;
    return (
      <View>
        <Text>{text}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('UsageCustom')}
          title="Custom Usage"
        />
        <Button
          onPress={() =>
            this.props.navigation.setParams({ showIcon: !(state.params && state.params.showIcon) })
          }
          title="Toggle Icon and Text"
        />
      </View>
    );
  }
}
