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
  onOverflowMenuPress: (OnOverflowMenuPressParams) => any,
  OverflowIcon: React.Element<any>,
  buttonWrapperStyle?: ViewStyleProp,
  testID: string,
  accessibilityLabel: string,
|};

export const OverflowMenu = ({
  children,
  OverflowIcon,
  accessibilityLabel,
  testID,
  buttonWrapperStyle,
  onOverflowMenuPress,
}: OverflowMenuProps) => {
  const toggleMenu = React.useContext(OverflowMenuContext);
  const btnRef = React.useRef<View | null>(null);
  const renderButtonElement = React.useCallback(() => OverflowIcon, [OverflowIcon]);

  const onPress = React.useCallback(() => {
    const titlesAndOnPresses =
      onOverflowMenuPress === overflowMenuPressHandlerDropdownMenu
        ? []
        : extractOverflowButtonData(React.Children.toArray(children));
    onOverflowMenuPress({
      children,
      hiddenButtons: titlesAndOnPresses,
      overflowButtonRef: btnRef.current,
      _private_toggleMenu: toggleMenu,
    });
  }, [children, onOverflowMenuPress, toggleMenu]);

  return (
    <View ref={btnRef} collapsable={false}>
      <HeaderButton
        title="overflow menu"
        renderButtonElement={renderButtonElement}
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
  onOverflowMenuPress: defaultOnOverflowMenuPress,
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
