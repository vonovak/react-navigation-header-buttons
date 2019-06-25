import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import ScreenProps from './index';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { connectActionSheet } from '@expo/react-native-action-sheet';

const MaterialHeaderButton = props => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="blue" />
);

@connectActionSheet
class RightHeaderButtons extends React.Component {
  render() {
    return (
      <HeaderButtons
        HeaderButtonComponent={MaterialHeaderButton}
        OverflowIcon={<MaterialIcons name="more-vert" size={23} color="blue" />}
        onOverflowMenuPress={this._onOpenActionSheet}
      >
        <Item title="person" iconName="person" onPress={() => alert('person')} />
        <Item title="edit" show="never" onPress={() => alert('edit')} />
        <Item title="delete" show="never" onPress={() => alert('delete')} />
      </HeaderButtons>
    );
  }
  _onOpenActionSheet = ({ hiddenButtons }) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    let options = hiddenButtons.map(it => it.props.title);
    let destructiveButtonIndex = 1;

    this.props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
      },
      buttonIndex => {
        hiddenButtons[buttonIndex].props.onPress();
      }
    );
  };
}

export class UsageWithCustomOverflow extends React.Component<ScreenProps> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Custom Overflow',
    headerRight: <RightHeaderButtons />,
  });

  render() {
    return <View />;
  }
}
