import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import ScreenProps from './index';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  defaultOnOverflowMenuPress,
} from 'react-navigation-header-buttons';

const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

export class UsageWithOverflow extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Usage With Overflow',
    headerRight: () => (
      <HeaderButtons
        HeaderButtonComponent={MaterialHeaderButton}
        OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
        onOverflowMenuPress={({ overflowButtonRef, hiddenButtons }) =>
          defaultOnOverflowMenuPress({
            overflowButtonRef,
            hiddenButtons,
            cancelButtonLabel: 'cancel - custom iOS label!',
          })
        }
      >
        <Item title="person" iconName="person" onPress={() => alert('person')} />
        <Item title="edit" show="never" onPress={() => alert('edit')} />
        {/* HiddenItem is the same as  show="never" for Item */}
        <HiddenItem title="hidden" onPress={() => alert('hidden shortcut')} />
      </HeaderButtons>
    ),
  };

  render() {
    return <View />;
  }
}
