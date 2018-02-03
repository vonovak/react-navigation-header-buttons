import React from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';

@withNavigation
export class UsageLeft extends React.Component {
  static navigationOptions = ({ navigation, navigation: { state } }) => ({
    title: 'Usage Left',
    headerLeft: (
      <HeaderButtons left IconComponent={MaterialIcons} iconSize={23} color="blue">
        <HeaderButtons.Item
          title="Test"
          iconName={state.params && state.params.showIcon ? 'arrow-back' : undefined}
          onPress={() => console.warn('Test')}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={25} color="blue">
        <HeaderButtons.Item title="back" onPress={() => navigation.goBack()} />
      </HeaderButtons>
    ),
  });

  render() {
    const { navigation: { state } } = this.props;
    const text = `
    headerLeft: (
      <HeaderButtons left IconComponent={MaterialIcons} iconSize={23} color="blue">
        <HeaderButtons.Item
          title="Test"
          iconName={state.params && state.params.showIcon ? 'arrow-back' : undefined}
          onPress={() => console.warn('Test')}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={25} color="blue">
        <HeaderButtons.Item title="back" onPress={() => navigation.goBack()} />
      </HeaderButtons>
    ),
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
