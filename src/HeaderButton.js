/**
 * @flow
 */
import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import TouchableItem from './TouchableItem';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const BUTTON_HIT_SLOP = Object.freeze({ top: 5, bottom: 5, left: 5, right: 5 });

// for renderVisibleButton() function
export type VisibleButtonProps = {
  IconComponent?: React.ComponentType<any>,
  iconSize?: number,
  color?: string,
  iconName?: string,
  title: string,
  buttonStyle?: ViewStyleProp,
};

// from <Item />
export type ItemProps = {
  ...$Exact<React.ElementConfig<typeof TouchableWithoutFeedback>>,
  ...VisibleButtonProps,
  onPress: ?() => any,
  style?: ViewStyleProp,
};

type OtherProps = {
  background?: any,
  foreground?: any,
  renderButtonElement: (VisibleButtonProps) => React.Element<any>,
  ...
};

export type HeaderButtonProps = ItemProps & OtherProps;

export function HeaderButton(props: HeaderButtonProps): React.Node {
  const {
    onPress,
    style,
    renderButtonElement,
    background,
    iconName,
    title,
    buttonStyle,
    IconComponent,
    iconSize,
    color,
    ...other
  } = props;

  const ButtonElement = renderButtonElement({
    iconName,
    title,
    buttonStyle,
    IconComponent,
    iconSize,
    color,
  });
  return (
    <TouchableItem
      borderless
      onPress={onPress}
      hitSlop={BUTTON_HIT_SLOP}
      rippleRadius={20}
      style={StyleSheet.compose(styles.buttonContainer, style)}
      {...other}
    >
      <View>{ButtonElement}</View>
    </TouchableItem>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
