import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import {
  HeaderButtons,
  Item,
  HiddenItem,
  OverflowMenu,
  OnOverflowMenuPressParams,
} from 'react-navigation-header-buttons';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import type { ScreenProps } from '../NavTypes';
import { ScreenBody } from '../components/ScreenBody';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';

function RightHeaderButtons(props: any) {
  const _onOpenActionSheet = ({ hiddenButtons }: OnOverflowMenuPressParams) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = hiddenButtons.map((it) => it.title);
    const destructiveButtonIndex = 1;

    props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
      },
      (buttonIndex: number) => {
        hiddenButtons[buttonIndex]?.onPress?.();
      }
    );
  };
  return (
    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
      <Item title="person" iconName="person" onPress={() => alert('person')} />
      <Item title="edit" onPress={() => alert('edit')} />
      <OverflowMenu
        OverflowIcon={
          <MaterialIcons name="more-horiz" size={23} color="blue" />
        }
        onPress={_onOpenActionSheet}
      >
        <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
        <HiddenItem title="delete" onPress={() => alert('delete')} />
      </OverflowMenu>
    </HeaderButtons>
  );
}

const ConnectedButtons = connectActionSheet(RightHeaderButtons);

export function UsageWithCustomOverflow({
  navigation,
}: ScreenProps<'UsageWithCustomOverflow'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ConnectedButtons />,
    });
  }, [navigation]);

  return (
    <ScreenBody>
      <Text>custom sheet from @expo/react-native-action-sheet</Text>
    </ScreenBody>
  );
}
