import React from 'react';
import {
  Divider,
  HeaderButtons,
  HiddenItem,
  Item,
  OverflowMenu,
} from 'react-navigation-header-buttons';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';
import { ScreenBody } from '../components/ScreenBody';
import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type TabScreenWithButtonsProps = any;
export const TabScreenWithButtons = ({
  navigation,
}: TabScreenWithButtonsProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Buttons in tab bar',
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={MaterialHeaderButton}
          preset={'tabHeader'}
        >
          <Item
            title="search"
            iconName="search"
            onPress={() => alert('search')}
          />
          <OverflowMenu
            OverflowIcon={({ color }) => (
              <MaterialIcons name="more-horiz" size={23} color={color} />
            )}
            // preset={'tabHeader'}
          >
            <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
            <Divider />
          </OverflowMenu>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <ScreenBody>
      <Text>
        dummy screen in tab bar, with header managed by the tab navigator
      </Text>
    </ScreenBody>
  );
};
