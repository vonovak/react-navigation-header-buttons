import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
  modes,
} from 'react-navigation-header-buttons';
import { connectActionSheet } from '@expo/react-native-action-sheet';

const MaterialHeaderButton = (props) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

function RightHeaderButtons(props) {
  const _onOpenActionSheet = ({ hiddenButtons }) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = hiddenButtons.map((it) => it.title);
    const destructiveButtonIndex = 1;

    props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        hiddenButtons[buttonIndex].onPress();
      }
    );
  };
  return (
    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
      <Item title="person" iconName="person" onPress={() => alert('person')} />
      <Item title="edit" show="never" onPress={() => alert('edit')} />
      <OverflowMenu
        OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
        onOverflowMenuPress={_onOpenActionSheet}
        mode={modes.CUSTOM}
      >
        <HiddenItem title="edit" onPress={() => alert('edit')} />
        <HiddenItem title="delete" onPress={() => alert('delete')} />
      </OverflowMenu>
    </HeaderButtons>
  );
}

const Connected = connectActionSheet(RightHeaderButtons);

export function UsageWithCustomOverflow({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Connected />,
    });
  }, [navigation]);

  return <View style={{ flex: 1 }}></View>;
}
