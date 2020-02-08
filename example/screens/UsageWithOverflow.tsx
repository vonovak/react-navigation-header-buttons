import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';

const MaterialHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

const El = (
  <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
    <Item title="person" iconName="person" onPress={() => alert('person')} />
    <Item title="edit" show="never" onPress={() => alert('edit')} />
    <OverflowMenu OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}>
      <HiddenItem title="hidden" onPress={() => alert('hidden shortcut')} />
    </OverflowMenu>
  </HeaderButtons>
);

export function UsageWithOverflow({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => El,
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
}
