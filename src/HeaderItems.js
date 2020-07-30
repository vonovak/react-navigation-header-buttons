// @flow
import * as React from 'react';
import { type ItemProps, type VisibleButtonProps } from './HeaderButton';
import { type Props as MenuItemProps } from './overflowMenu/vendor/MenuItem';
import { HeaderButtonsContext } from './HeaderButtonsContext';
import { Text, StyleSheet, Platform } from 'react-native';
import { OverflowMenuContext } from './overflowMenu/OverflowMenuContext';
import { MenuItem } from './overflowMenu/vendor/MenuItem';

type HiddenItemProps = {|
  ...MenuItemProps,
  destructive?: boolean,
|};

export function HiddenItem({ destructive, onPress, ...otherProps }: HiddenItemProps) {
  const toggleMenu = React.useContext(OverflowMenuContext);

  // when rendering dropdown menu (e.g. android default) the return value is actually rendered
  // when we show action sheet, we do not render the returned value,
  // but just extract title, onPress and destructive passed to HiddenItem. HiddenItem() is not called
  const onMenuItemPress = () => {
    toggleMenu();
    onPress && onPress();
  };

  return <MenuItem {...otherProps} onPress={onMenuItemPress} />;
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
    <IconComponent
      name={iconName}
      color={color}
      size={iconSize}
      style={StyleSheet.compose(styles.button, buttonStyle)}
    />
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
        marginHorizontal: 11,
      },
      default: {
        fontSize: 17,
        marginHorizontal: 10,
      },
    }),
  },
  button: {
    marginHorizontal: 11,
  },
});
