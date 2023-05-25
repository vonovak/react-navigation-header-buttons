import * as React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HeaderButtonsComponentType,
} from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { ScreenBody } from '../components/ScreenBody';

const MultiFontFamilyHeaderButton: HeaderButtonsComponentType = (props) => {
  return <HeaderButton {...props} iconSize={23} color="blue" />;
};

export function UsageDifferentFontFamilies({
  navigation,
}: ScreenProps<'UsageDifferentFontFamilies'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MultiFontFamilyHeaderButton}>
          <Item
            title="settings-ion"
            IconComponent={Ionicons}
            iconName="ios-settings"
            onPress={() => alert('ionicons settings')}
          />
          <Item
            title="settings-mat"
            IconComponent={MaterialIcons}
            iconName="settings"
            onPress={() => alert('material settings')}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <ScreenBody />;
}
