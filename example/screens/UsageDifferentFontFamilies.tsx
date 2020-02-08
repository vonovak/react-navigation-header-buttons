import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const MultiFontFamilyHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={props.MyIconComponent} iconSize={23} color="blue" />
);

export function UsageDifferentFontFamilies({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MultiFontFamilyHeaderButton}>
          <Item
            title="settings-ion"
            MyIconComponent={Ionicons}
            iconName="ios-settings"
            onPress={() => alert('ionicons settings')}
          />
          <Item
            title="settings-mat"
            MyIconComponent={MaterialIcons}
            iconName="settings"
            onPress={() => alert('material settings')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
}
