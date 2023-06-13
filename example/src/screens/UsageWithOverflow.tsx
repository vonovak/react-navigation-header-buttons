import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import {
  HeaderButtons,
  Item,
  HiddenItem,
  OverflowMenu,
  defaultOnOverflowMenuPress,
} from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';
import { ScreenBody } from '../components/ScreenBody';

const RightHeader = () => (
  <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
    <Item title="person" iconName="person" onPress={() => alert('person')} />
    <Item title="edit" onPress={() => alert('edit')} />
    <OverflowMenu
      OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
      pressColor="blue"
      onPress={(params) => {
        defaultOnOverflowMenuPress({
          ...params,
          cancelButtonLabel: 'cancel - custom iOS label!',
        });
      }}
    >
      <HiddenItem title="hidden" onPress={() => alert('hidden shortcut')} />
    </OverflowMenu>
  </HeaderButtons>
);

export function UsageWithOverflow({
  navigation,
}: ScreenProps<'UsageWithOverflow'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: RightHeader,
      // title: '',
    });
  }, [navigation]);

  return (
    <ScreenBody>
      <Text>default overflow menu handler with custom cancel label</Text>
    </ScreenBody>
  );
}
