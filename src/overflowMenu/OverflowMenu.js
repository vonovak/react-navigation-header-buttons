// @flow
import * as React from 'react';
import {
  extractOverflowButtonData,
  defaultOnOverflowMenuPress,
  type OnOverflowMenuPressParams,
} from '../overflowMenuPressHandlers';
import { OverflowMenuContext } from './OverflowMenuContext';
import RN, { View, StyleSheet, Platform } from 'react-native';
import { HeaderButton } from '../HeaderButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { OVERFLOW_BUTTON_TEST_ID } from '../e2e';
import invariant from 'invariant';

export const modes = Object.freeze({
  DEFAULT: 'DEFAULT', // ios: action sheet, android & web: material dropdown menu
  ALTERNATIVE: 'ALTERNATIVE', // ios: action sheet, android: native popup menu, web: dropdown menu
  DROPDOWN_MENU: 'DROPDOWN_MENU', // material dropdown menu,
  CUSTOM: 'CUSTOM', // developer needs to provide onPress callback and react however they want
});

export const getOnPressForMode = (
  mode: $Keys<typeof modes>,
  showNativeMenu: () => void,
  toggleDropdownMenu: () => void,
  customOnPress: () => void
) => {
  const { Platform } = RN;
  switch (mode) {
    case modes.DEFAULT:
      return Platform.select({
        ios: showNativeMenu,
        default: toggleDropdownMenu,
      });
    case modes.ALTERNATIVE:
      return Platform.select({
        // TODO use 'native' key in >=0.62
        ios: showNativeMenu,
        android: showNativeMenu,
        default: toggleDropdownMenu,
      });
    case modes.DROPDOWN_MENU:
      return toggleDropdownMenu;
    case modes.CUSTOM:
      return customOnPress;
    default:
      throw new Error(
        `OverflowMenu received invalid mode prop: ${mode}. Must be one of ${JSON.stringify(
          Object.values(modes)
        )}`
      );
  }
};

export type OverflowMenuProps = {|
  children: Array<React.Element<any>>,
  mode: $Keys<typeof modes>,
  onOverflowMenuPress?: (OnOverflowMenuPressParams) => any,
  OverflowIcon: React.Element<any>,
  buttonWrapperStyle?: ViewStyleProp,
  testID: string,
  accessibilityLabel: string,
|};

export const OverflowMenu = ({
  children,
  OverflowIcon,
  mode,
  accessibilityLabel,
  testID,
  buttonWrapperStyle,
  onOverflowMenuPress, //TODO test
}: OverflowMenuProps) => {
  const toggleMenu = React.useContext(OverflowMenuContext);
  const btnRef = React.useRef<View | null>(null);

  const toggleDropdownMenu = React.useCallback(() => {
    if (btnRef.current) {
      btnRef.current.measureInWindow((x, y, width, height) => {
        toggleMenu({ elements: children, x: x + width, y: y + 24 });
      });
      // TODO else
    }
  }, [children, toggleMenu]);

  const showNativeMenu = React.useCallback(() => {
    const titlesAndOnPresses = extractOverflowButtonData(children);

    defaultOnOverflowMenuPress({
      hiddenButtons: titlesAndOnPresses,
      overflowButtonRef: btnRef.current,
    });
  }, [children]);

  const showCustomMenu = React.useCallback(() => {
    const titlesAndOnPresses = extractOverflowButtonData(children);
    invariant(
      onOverflowMenuPress,
      'you must provide onOverflowMenuPress prop when mode=modes.CUSTOM'
    );
    onOverflowMenuPress({
      hiddenButtons: titlesAndOnPresses,
      overflowButtonRef: btnRef.current,
    });
  }, [children, onOverflowMenuPress]);

  const onPress = getOnPressForMode(mode, showNativeMenu, toggleDropdownMenu, showCustomMenu);

  return (
    <View ref={btnRef} collapsable={false}>
      <HeaderButton
        title="overflow menu"
        renderButtonElement={() => OverflowIcon}
        buttonWrapperStyle={[styles.icon, buttonWrapperStyle]}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      />
    </View>
  );
};

OverflowMenu.defaultProps = {
  accessibilityLabel: 'More options',
  OverflowIcon: <View />,
  mode: modes.DEFAULT,
  testID: OVERFLOW_BUTTON_TEST_ID,
};

const styles = StyleSheet.create({
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
