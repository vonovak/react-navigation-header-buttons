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
  buttonWrapperStyle?: ViewStyleProp,
  testID: string,
  accessibilityLabel: string,
  onPress: (OnOverflowMenuPressParams) => any,
  // boolean can be passed by user when OverflowMenu is rendered by itself
  // and will render extra margins on the chosen side
  // null is passed when OverflowMenu is rendered inside of HeaderButtons and means no extra margin
  // this might be more complicated than needed but it's 1 am now :)
  left: boolean | null,
|};

export const OverflowMenu = ({
  children,
  OverflowIcon,
  accessibilityLabel,
  testID,
  buttonWrapperStyle,
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
        buttonWrapperStyle={[styles.icon, buttonWrapperStyle]}
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
  left: false, // this is needed for when OverflowMenu is rendered without HeaderButtons
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
