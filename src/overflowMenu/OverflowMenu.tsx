import {
  extractOverflowButtonData,
  overflowMenuPressHandlerDropdownMenu,
  defaultOnOverflowMenuPress,
  type OnOverflowMenuPressParams,
} from './overflowMenuPressHandlers';
import { OVERFLOW_TOP, useOverflowMenu } from './OverflowMenuContext';
import { View, StyleSheet, type ColorValue } from 'react-native';
import { HeaderButton, type HeaderButtonProps } from '../HeaderButton';
import { OVERFLOW_BUTTON_TEST_ID } from '../e2e';
import { ButtonsWrapper, ButtonsWrapperProps } from '../ButtonsWrapper';
import {
  Children,
  ComponentType,
  isValidElement,
  useCallback,
  useRef,
  type ReactElement,
} from 'react';
import * as React from 'react';

export type OverflowMenuProps = Omit<
  HeaderButtonProps,
  'onPress' | 'title' | 'renderButton'
> &
  Pick<ButtonsWrapperProps, 'left' | 'preset' | 'children'> & {
    OverflowIcon: ReactElement | ComponentType<{ color: ColorValue }>;
    onPress?: (params: OnOverflowMenuPressParams) => any;
  };

export const OverflowMenu = ({
  children,
  OverflowIcon = <View />,
  accessibilityLabel = 'More options',
  testID = OVERFLOW_BUTTON_TEST_ID,
  onPress = defaultOnOverflowMenuPress,
  left = false, // this is needed only when OverflowMenu is rendered without HeaderButtons,
  preset,
  ...other
}: OverflowMenuProps) => {
  const { toggleMenu } = useOverflowMenu();

  const btnRef = useRef<View | null>(null);
  const renderButtonElement = useCallback(
    ({ color }: { color: ColorValue }) => {
      return isValidElement<any>(OverflowIcon) ? (
        OverflowIcon
      ) : (
        <OverflowIcon color={color} />
      );
    },
    [OverflowIcon]
  );

  const usedOnPress = useCallback(() => {
    const titlesAndOnPresses =
      onPress === overflowMenuPressHandlerDropdownMenu
        ? []
        : extractOverflowButtonData(children);
    onPress({
      children,
      hiddenButtons: titlesAndOnPresses,
      overflowButtonRef: btnRef.current,
      _private_toggleMenu: toggleMenu,
    });
  }, [children, onPress, toggleMenu]);

  const validChildren = Children.toArray(children).filter(isValidElement);
  if (validChildren.length === 0) {
    return null;
  }

  return (
    <ButtonsWrapper left={left} style={styles.wrapper} preset={preset}>
      <View
        ref={btnRef}
        collapsable={false}
        style={styles.overflowMenuAnchor}
      />
      <HeaderButton
        title="overflow menu"
        renderButton={renderButtonElement}
        onPress={usedOnPress}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        {...other}
      />
    </ButtonsWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    columnGap: 0,
  },
  overflowMenuAnchor: {
    // these are really just needed bcs of the native android popup menu
    position: 'absolute',
    top: -OVERFLOW_TOP,
    // TODO android actually has a little gap on the right of the menu
    right: -15,
    backgroundColor: 'transparent',
    width: 1,
    height: 1,
  },
});
