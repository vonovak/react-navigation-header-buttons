import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavHeader from 'react-navigation-header-buttons';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

@withNavigation
export class UsageWithIcons extends React.Component {
  static navigationOptions = {
    title: 'Usage With Icons',
    headerRight: (
      <NavHeader IconComponent={Ionicons} size={23} color="blue">
        <NavHeader.Item label="add" iconName="ios-search" onPress={() => console.warn('add')} />
        <NavHeader.Item label="select" onPress={() => console.warn('edit')} />
      </NavHeader>
    ),
  };

  render() {
    const text = `
    headerRight: (
      <NavHeader IconComponent={Ionicons} size={23} color="blue">
        <NavHeader.Item label="add" iconName="ios-add" onPress={() => console.warn('add')} />
        <NavHeader.Item label="edit" onPress={() => console.warn('edit')} />
      </NavHeader>
    )
    `;
    return (
      <View>
        {/* <Icon.ToolbarAndroid
          style={{ height: 56, backgroundColor: 'grey' }}
          actions={[
            // { title: 'One', show: 'always' },
            { title: 'edit', show: 'always' },
            { title: 'add', show: 'always', iconName: 'ios-add' },
            // { title: 'Two', show: 'never',  },
          ]}
        /> */}
        <Text>{text}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('UsageWithOverflow')}
          title="Usage with overflow"
        />
      </View>
    );
  }
}
