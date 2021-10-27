/**
 * @flow
 */
import * as React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Platform } from 'react-native';
import TouchableItem from './TouchableItem';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { useTheme } from '@react-navigation/native';

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
  pressColor?: any,
  renderButtonElement: (VisibleButtonProps) => React.Element<any>,
  ...
};

export type HeaderButtonProps = ItemProps & OtherProps;

export function HeaderButton(props: HeaderButtonProps): React.Node {
  const { colors, dark } = useTheme();
  const themeColor = Platform.select({
    ios: colors.primary,
    default: colors.text,
  });
  const themePressColorAndroid = dark ? 'rgba(255, 255, 255, .32)' : 'rgba(0, 0, 0, .32)';

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
    pressColor,
    ...other
  } = props;

  const usedColor = color || themeColor;
  const usedPressColor = pressColor || themePressColorAndroid;

  const ButtonElement = renderButtonElement({
    iconName,
    title,
    buttonStyle,
    IconComponent,
    iconSize,
    color: usedColor,
  });

  const handlePress = () => onPress && requestAnimationFrame(onPress);

  return (
    <TouchableItem
      borderless
      onPress={handlePress}
      hitSlop={BUTTON_HIT_SLOP}
      rippleRadius={20}
      style={StyleSheet.compose(styles.buttonContainer, style)}
      pressColor={usedPressColor}
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
