/**
 * @flow
 */
import * as React from 'react';
import { StyleSheet, View, Platform, TouchableWithoutFeedback } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

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
  ...ViewProps,
  ...VisibleButtonProps,
  onPress: ?() => any,
  buttonWrapperStyle?: ViewStyleProp,
|};

export type HiddenItemProps = {|
  ...$Exact<React.ElementConfig<typeof TouchableWithoutFeedback>>,
  onPress: ?() => any,
  title: string,
|};

type OtherProps = {|
  background?: any,
  foreground?: any,
  renderButtonElement: (VisibleButtonProps) => React.Element<any>,
|};

export type HeaderButtonProps = {|
  ...ItemProps,
  ...VisibleButtonProps,
  ...OtherProps,
|};

const ANDROID_VERSION_PIE = 28;
// A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
// https://github.com/facebook/react-native/issues/6480
const useForeground = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE;
// this is where all the onPress, title and Icon props meet to render actual result

export function HeaderButton(props: HeaderButtonProps) {
  const {
    onPress,
    buttonWrapperStyle,
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
      style={[styles.buttonContainer, buttonWrapperStyle]}
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
    marginHorizontal: 11,
    backgroundColor: 'lightblue',
  },
});
