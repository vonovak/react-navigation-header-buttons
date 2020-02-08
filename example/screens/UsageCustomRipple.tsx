import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import Touchable from 'react-native-platform-touchable';

const DisableableHeaderButton = (props) => (
  <HeaderButton
    {...props}
    background={Touchable.Ripple('red', true)}
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
  />
);

export function UsageCustomRipple({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={DisableableHeaderButton}>
          <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
          <Item title="select" onPress={() => alert('select')} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
}
