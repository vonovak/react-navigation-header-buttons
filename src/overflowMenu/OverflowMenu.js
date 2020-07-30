// @flow
import * as React from 'react';
import {
  extractOverflowButtonData,
  overflowMenuPressHandlerDropdownMenu,
  defaultOnOverflowMenuPress,
  type OnOverflowMenuPressParams,
} from '../overflowMenuPressHandlers';
import { OVERFLOW_TOP, OverflowMenuContext } from './OverflowMenuContext';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButton } from '../HeaderButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { OVERFLOW_BUTTON_TEST_ID } from '../e2e';
import { ButtonsWrapper } from '../ButtonsWrapper';

export type OverflowMenuProps = {|
  children: React.Node,
  OverflowIcon: React.Element<any>,
  style?: ViewStyleProp,
  testID: string,
  accessibilityLabel: string,
  onPress: (OnOverflowMenuPressParams) => any,
  left: boolean,
|};

export const OverflowMenu = ({
  children,
  OverflowIcon,
  accessibilityLabel,
  testID,
  style,
  onPress,
  left,
}: OverflowMenuProps) => {
  const toggleMenu = React.useContext(OverflowMenuContext);
  const btnRef = React.useRef<View | null>(null);
  const renderButtonElement = React.useCallback(() => OverflowIcon, [OverflowIcon]);

  const usedOnPress = React.useCallback(() => {
    const titlesAndOnPresses =
      onPress === overflowMenuPressHandlerDropdownMenu ? [] : extractOverflowButtonData(children);
    onPress({
      children,
      hiddenButtons: titlesAndOnPresses,
      overflowButtonRef: btnRef.current,
      _private_toggleMenu: toggleMenu,
    });
  }, [children, onPress, toggleMenu]);

  return (
    <ButtonsWrapper left={left}>
      <View ref={btnRef} collapsable={false} style={styles.overflowMenuView} />
      <HeaderButton
        title="overflow menu"
        renderButtonElement={renderButtonElement}
        style={[styles.icon, style]}
        onPress={usedOnPress}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      />
    </ButtonsWrapper>
  );
};

OverflowMenu.defaultProps = {
  accessibilityLabel: 'More options',
  OverflowIcon: <View />,
  onPress: defaultOnOverflowMenuPress,
  testID: OVERFLOW_BUTTON_TEST_ID,
  left: false, // this is needed only when OverflowMenu is rendered without HeaderButtons
};

const styles = StyleSheet.create({
  icon: {
    ...Platform.select({
      android: {
        marginRight: 9,
        marginLeft: 7,
      },
    }),
  },
  overflowMenuView: {
    // these are really just needed bcs of the native android popup menu
    position: 'absolute',
    top: -OVERFLOW_TOP,
    // TODO android actually has a little gap on the right of the menu
    right: 0,
    backgroundColor: 'transparent',
    width: 1,
    height: 1,
  },
});
