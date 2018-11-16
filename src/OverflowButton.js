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
import { HeaderButton, type VisibleButtonProps } from './HeaderButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
export const OVERFLOW_BUTTON_TEST_ID = 'headerOverflowButton';

export const IS_IOS = Platform.OS === 'ios';

export type OverflowButtonProps = {
  OverflowIcon: React.Element<*>,
  onOverflowMenuPress?: ({ hiddenButtons: Array<React.Element<*>> }) => any,
};

type Props = {
  hiddenButtons: Array<React.Element<*>>,
  buttonWrapperStyle?: ViewStyleProp,
  ...$Exact<OverflowButtonProps>,
};

export class OverflowButton extends React.Component<Props> {
  overflowRef: ?View;

  setOverflowRef = (ref: ?View) => {
    this.overflowRef = ref;
  };

  render() {
    const { buttonWrapperStyle } = this.props;

    return (
      <View>
        <View ref={this.setOverflowRef} style={styles.overflowMenuView} />
        <HeaderButton
          title={OVERFLOW_BUTTON_TEST_ID}
          getButtonElement={this.getOverflowButtonElement}
          onPress={this.showOverflowPopup}
          buttonWrapperStyle={[styles.icon, buttonWrapperStyle]}
          testID={OVERFLOW_BUTTON_TEST_ID}
        />
      </View>
    );
  }

  getOverflowButtonElement = () => this.props.OverflowIcon;

  showOverflowPopup = () => {
    const { onOverflowMenuPress, hiddenButtons } = this.props;
    if (onOverflowMenuPress) {
      onOverflowMenuPress({ hiddenButtons, overflowButtonRef: this.overflowRef });
    } else {
      IS_IOS ? this.showPopupIos() : this.showPopupAndroid();
    }
  };

  showPopupAndroid() {
    UIManager.showPopupMenu(
      findNodeHandle(this.overflowRef),
      this.props.hiddenButtons.map(btn => btn.props.title),
      err => {
        console.debug(`overflowBtn error ${err}`);
      },
      this.onHiddenItemPress
    );
  }

  onHiddenItemPress = (eventName: string, index: number) => {
    if (eventName !== 'itemSelected') return;
    this.props.hiddenButtons[index].props.onPress();
  };

  showPopupIos() {
    let actionTitles = this.props.hiddenButtons.map(btn => btn.props.title);
    actionTitles.push('cancel');

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
  }
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
        marginRight: 9,
        marginLeft: 7,
      },
    }),
  },
});
