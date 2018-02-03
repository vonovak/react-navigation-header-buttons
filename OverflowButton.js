/*
* @flow
*/
import * as React from 'react';
import {
  View,
  UIManager,
  findNodeHandle,
  StyleSheet,
  ActionSheetIOS,
  Platform,
} from 'react-native';
// TODO import based on global.Expo?
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderButon } from './HeaderButon';

export const textTransformer = (label: string) =>
  Platform.OS === 'ios' ? label.charAt(0).toUpperCase() + label.substr(1) : label.toUpperCase();

type Props = {
  hiddenButtons: Array<React.Element<*>>,
  color: string,
  OverflowIcon?: React.Node,
  cancelButtonLabel: string,
};

export class OverflowButton extends React.Component<Props> {
  overflowRef: ?View;
  static defaultProps = {
    color: 'grey',
    cancelButtonLabel: 'Cancel',
  };

  setOverflowRef = (ref: ?View) => {
    this.overflowRef = ref;
  };

  render() {
    const { OverflowIcon } = this.props;
    const ButtonElement = OverflowIcon ? (
      OverflowIcon
    ) : (
      <Icon name="more-vert" size={23} color={this.props.color} style={styles.icon} />
    );
    return (
      <View>
        <View ref={this.setOverflowRef} style={styles.overflowMenuView} />
        <HeaderButon onPress={this.showOverflowPopup} ButtonElement={ButtonElement} />
      </View>
    );
  }

  showOverflowPopup = () => {
    Platform.OS === 'android' ? this.showPopupAndroid() : this.showPopupIos();
  };

  showPopupAndroid() {
    UIManager.showPopupMenu(
      findNodeHandle(this.overflowRef),
      this.props.hiddenButtons.map(btn => btn.props.title),
      err => {
        console.debug(`popup error ${err}`);
      },
      this.onHiddenItemPress
    );
  };

  onHiddenItemPress = (eventName: string, index: number) => {
    if (eventName !== 'itemSelected') return;
    this.props.hiddenButtons[index].props.onPress();
  };

  showPopupIos() {
    const actionTitles = this.props.hiddenButtons.map(btn => btn.props.title);
    actionTitles.push(this.props.cancelButtonLabel);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionTitles,
        cancelButtonIndex: actionTitles.length - 1,
      },
      (buttonIndex: number) => {
        if (buttonIndex !== actionTitles.length - 1) {
          this.onHiddenItemPress('itemSelected', buttonIndex);
        }
      }
    );
  };
}

const styles = StyleSheet.create({
  overflowMenuView: {
    position: 'absolute',
    top: -10,
    // TODO android actually has a little gap on the right of the menu
    right: 0,
    backgroundColor: 'transparent',
    width: 1,
    height: 1,
  },
  icon: {
    marginTop: 2,
    ...Platform.select({
      android: {
        marginRight: 10,
        marginLeft: 7,
      },
    }),
  },
});
