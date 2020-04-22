// @flow
import * as React from 'react';
import { type ItemProps, type VisibleButtonProps, type HiddenItemProps } from './HeaderButton';
import { HeaderButtonsContext } from './HeaderButtonsContext';
import { Text, StyleSheet, Platform } from 'react-native';
import { OverflowMenuContext } from './overflowMenu/OverflowMenuContext';
import { MenuItem } from './overflowMenu/vendor/MenuItem';

const noop = () => {};
export function HiddenItem(props: HiddenItemProps) {
  return (
    <OverflowMenuContext.Consumer>
      {(toggleMenu) => {
        // when rendering dropdown menu (eg android default) the return value is actually rendered
        // when we show action sheet, we do not render the returned value, just extract title and onPress
        const onPressSafe = props.onPress || noop;
        const onPress = toggleMenu
          ? () => {
              toggleMenu();
              onPressSafe();
            }
          : onPressSafe;

        return <MenuItem {...props} onPress={onPress} />;
      }}
    </OverflowMenuContext.Consumer>
  );
}

// TODO check RTL
export function Item(props: ItemProps) {
  const HeaderButtonComponent = React.useContext(HeaderButtonsContext);
  // HeaderButtonComponent knows iconSize, icon color and etc.
  // Item itself will likely only have title and onPress
  return <HeaderButtonComponent {...props} renderButtonElement={renderVisibleButton} />;
}

export function renderVisibleButton(visibleButtonProps: VisibleButtonProps): React.Element<any> {
  const { IconComponent, iconSize, color, iconName, title, buttonStyle } = visibleButtonProps;

  return IconComponent && iconName ? (
    <IconComponent name={iconName} color={color} size={iconSize} style={buttonStyle} />
  ) : (
    <Text style={[styles.text, { color }, buttonStyle]}>{textTransformer(title)}</Text>
  );
}

const textTransformer = (label: string) =>
  Platform.OS === 'ios' ? label.charAt(0).toUpperCase() + label.substr(1) : label.toUpperCase();

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
      },
      default: {
        fontSize: 17,
      },
    }),
  },
});
