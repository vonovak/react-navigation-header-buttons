import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import {
  HiddenItem,
  OverflowMenu,
  overflowMenuPressHandlerActionSheet,
  overflowMenuPressHandlerPopupMenu,
  overflowMenuPressHandlerDropdownMenu,
  HiddenItemProps,
  OnOverflowMenuPressParams,
  useOverflowMenu,
  Divider,
} from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { Button } from '../components/PaddedButton';
import { ScreenBody } from '../components/ScreenBody';

const ReusableItem = ({ title, disabled = false }: HiddenItemProps) => {
  return (
    <HiddenItem
      title={title}
      disabled={disabled}
      onPress={() => alert(title)}
    />
  );
};

const handlers = {
  overflowMenuPressHandlerDropdownMenu,
  overflowMenuPressHandlerActionSheet,
  overflowMenuPressHandlerPopupMenu,
  custom: function custom(obj: OnOverflowMenuPressParams) {
    alert('you custom function will receive:' + Object.keys(obj).join(', '));
  },
};

const CustomViewInOverflow = () => {
  const { closeMenu } = useOverflowMenu();
  return (
    <View style={{ backgroundColor: 'orange', maxWidth: 200 }}>
      <Text onPress={closeMenu}>
        custom view that will only be considered for
        overflowMenuPressHandlerDropdownMenu
      </Text>
    </View>
  );
};

export function UsageWithOverflowComplex({
  navigation,
}: ScreenProps<'UsageWithOverflowComplex'>) {
  const [index, setIndex] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OverflowMenu
          OverflowIcon={
            <MaterialIcons name="more-vert" size={23} color="blue" />
          }
          onPress={Object.values(handlers)[index]}
        >
          <HiddenItem
            icon={<MaterialIcons name="search" size={23} />}
            title="search"
            onPress={() => alert('search')}
          />
          <ReusableItem title="hidden2" />
          <ReusableItem title="hidden3" disabled />
          <Divider />
          {/*Arrays as children also work*/}
          {[
            <HiddenItem
              key="hidden4"
              title="hidden4"
              onPress={() => alert('hidden4')}
            />,
          ]}
          <CustomViewInOverflow />
        </OverflowMenu>
      ),
    });
  }, [navigation, index]);

  return (
    <ScreenBody>
      <Text>current mode: {Object.keys(handlers)[index]}</Text>

      {Object.keys(handlers).map((key, i) => {
        return (
          <Button
            key={i}
            onPress={() => {
              setIndex(i);
            }}
            title={key}
          />
        );
      })}
      <Text>behavior is platform-dependent</Text>
    </ScreenBody>
  );
}
