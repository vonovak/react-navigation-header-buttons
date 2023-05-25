import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HeaderButtonsComponentType,
} from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { ScreenBody } from '../components/ScreenBody';

const DisableableHeaderButton: HeaderButtonsComponentType = (props) => (
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

export function UsageDisabled({ navigation }: ScreenProps<'UsageDisabled'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={DisableableHeaderButton}>
          <Item
            title="search"
            iconName="ios-search"
            onPress={() => alert('search')}
            disabled
          />
          <Item title="select" onPress={() => alert('select')} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return <ScreenBody />;
}
