/**
 * @flow
 */
import * as React from 'react';
import { StyleSheet, View, Platform, TouchableWithoutFeedback } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const BUTTON_HIT_SLOP = Object.freeze({ top: 5, bottom: 5, left: 5, right: 5 });

// for renderVisibleButton() function
export type VisibleButtonProps = {|
  IconComponent?: React.ComponentType<any>,
  iconSize?: number,
  color?: string,
  iconName?: string,
  title: string,
  buttonStyle?: ViewStyleProp,
|};

// from <Item />
export type ItemProps = {|
  ...$Exact<React.ElementConfig<typeof TouchableWithoutFeedback>>,
  ...VisibleButtonProps,
  onPress: ?() => any,
  style?: ViewStyleProp,
|};

type OtherProps = {|
  background?: any,
  foreground?: any,
  renderButtonElement: (VisibleButtonProps) => React.Element<any>,
|};

export type HeaderButtonProps = {|
  ...ItemProps,
  ...OtherProps,
|};

// A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
// https://github.com/facebook/react-native/issues/6480
const useForeground = Platform.OS === 'android' && Platform.Version >= 28;
// this is where all the onPress, title and Icon props meet to render actual result

export function HeaderButton(props: HeaderButtonProps) {
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
    <Touchable
      background={useForeground ? undefined : background}
      foreground={useForeground ? background : undefined}
      onPress={onPress}
      hitSlop={BUTTON_HIT_SLOP}
      style={StyleSheet.compose(styles.buttonContainer, style)}
      {...other}
    >
      <View>{ButtonElement}</View>
    </Touchable>
  );
}

HeaderButton.defaultProps = {
  background: Touchable.Ripple('rgba(0, 0, 0, .32)', true),
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
