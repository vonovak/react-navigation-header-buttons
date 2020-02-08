import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const DisableableHeaderButton = (props) => (
  <HeaderButton
    {...props}
    onPress={props.onPress}
    disabled={props.disabled}
    buttonStyle={props.disabled ? { color: 'grey' } : undefined}
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
  />
);

const El = (
  <HeaderButtons HeaderButtonComponent={DisableableHeaderButton}>
    <Item title="search" iconName="ios-search" onPress={() => alert('search')} disabled />
    <Item title="select" onPress={() => alert('select')} />
  </HeaderButtons>
);

export function UsageDisabled({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => El,
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
}
