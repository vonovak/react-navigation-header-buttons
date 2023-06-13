import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  HeaderButtons,
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
  ItemProps,
  HiddenItemProps,
} from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';
import { ScreenBody } from '../components/ScreenBody';
import { Text } from 'react-native';
import { useLayoutEffect } from 'react';

const EditItem = ({ onPress }: Pick<ItemProps, 'onPress'>) => {
  return <Item title="edit" onPress={onPress} />;
};

const ReusableHiddenItem = ({ onPress }: Pick<HiddenItemProps, 'onPress'>) => (
  <HiddenItem title="hidden2" onPress={onPress} disabled />
);

export function UsageWithIcons({ navigation }: ScreenProps<'UsageWithIcons'>) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Demo',
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <EditItem onPress={() => alert('Edit')} />
          <Item
            title="search"
            iconName="search"
            onPress={() => alert('search')}
          />
          <OverflowMenu
            OverflowIcon={({ color }) => (
              <MaterialIcons name="more-horiz" size={23} color={color} />
            )}
          >
            <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
            <Divider />
            <ReusableHiddenItem onPress={() => alert('hidden2')} />
          </OverflowMenu>
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <ScreenBody>
      <Text>demo!</Text>
    </ScreenBody>
  );
}
