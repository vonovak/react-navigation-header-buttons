/*
 * @flow
 */
import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButton, type VisibleButtonProps } from './HeaderButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { OVERFLOW_BUTTON_TEST_ID } from './e2e';
import {
  defaultOnOverflowMenuPress,
  type OnOverflowMenuPressParams,
} from './overflowMenuPressHandlers';

export type OverflowButtonProps = {
  onOverflowMenuPress: OnOverflowMenuPressParams => any,
  OverflowIcon: React.Element<any>,
};

type Props = {
  hiddenButtons: Array<React.Element<any>>,
  buttonWrapperStyle?: ViewStyleProp,
  testID: string,
  ...$Exact<OverflowButtonProps>,
};

export class OverflowButton extends React.Component<Props> {
  overflowRef: ?View;

  static defaultProps = {
    testID: OVERFLOW_BUTTON_TEST_ID,
    onOverflowMenuPress: defaultOnOverflowMenuPress,
  };

  setOverflowRef = (ref: ?View) => {
    this.overflowRef = ref;
  };

  render() {
    const { buttonWrapperStyle, testID } = this.props;

    return (
      <View>
        <View ref={this.setOverflowRef} style={styles.overflowMenuView} />
        <HeaderButton
          title={OVERFLOW_BUTTON_TEST_ID}
          getButtonElement={this.getOverflowButtonElement}
          onPress={this.showOverflowPopup}
          buttonWrapperStyle={[styles.icon, buttonWrapperStyle]}
          testID={testID}
        />
      </View>
    );
  }

  getOverflowButtonElement = () => this.props.OverflowIcon;

  showOverflowPopup = () => {
    const { onOverflowMenuPress, hiddenButtons } = this.props;
    onOverflowMenuPress({ hiddenButtons, overflowButtonRef: this.overflowRef });
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
        marginRight: 9,
        marginLeft: 7,
      },
    }),
  },
});
