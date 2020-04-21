// @flow
import * as React from 'react';
import {
  extractOverflowButtonData,
  overflowMenuPressHandlerDropdownMenu,
  defaultOnOverflowMenuPress,
  type OnOverflowMenuPressParams,
} from '../overflowMenuPressHandlers';
import { OverflowMenuContext } from './OverflowMenuContext';
import { View, StyleSheet, Platform } from 'react-native';
import { HeaderButton } from '../HeaderButton';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { OVERFLOW_BUTTON_TEST_ID } from '../e2e';

export type OverflowMenuProps = {|
  children: React.Node,
  OverflowIcon: React.Element<any>,
  buttonWrapperStyle?: ViewStyleProp,
  testID: string,
  accessibilityLabel: string,
  onPress: (OnOverflowMenuPressParams) => any,
|};

export const OverflowMenu = ({
  children,
  OverflowIcon,
  accessibilityLabel,
  testID,
  buttonWrapperStyle,
  onPress,
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
    <View ref={btnRef} collapsable={false}>
      <HeaderButton
        title="overflow menu"
        renderButtonElement={renderButtonElement}
        buttonWrapperStyle={[styles.icon, buttonWrapperStyle]}
        onPress={usedOnPress}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      />
    </View>
  );
};

OverflowMenu.defaultProps = {
  accessibilityLabel: 'More options',
  OverflowIcon: <View />,
  onPress: defaultOnOverflowMenuPress,
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
