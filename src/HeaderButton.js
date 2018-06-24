/**
 * @flow
 */
import * as React from 'react';
const BUTTON_HIT_SLOP = { top: 5, bottom: 5, left: 5, right: 5 };
import { StyleSheet, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type RippleOptions = {
  pressColor: string;
  borderless?: boolean;
  useForeground?: boolean;
};

export type HeaderButtonProps = {
  onPress: ?() => any,
  buttonWrapperStyle?: StyleObj,
  testID?: string,
  ripple?: RippleOptions,
};

export class HeaderButton extends React.PureComponent<
  HeaderButtonProps & { ButtonElement: React.Node }
> {
  static defaultProps = {
    ripple: {
      pressColor: 'rgba(0, 0, 0, .32)',
      borderless: false,
      useForeground: false,
    },
  };

  render() {
    const { ButtonElement, onPress, buttonWrapperStyle, testID, ripple } = this.props;
    const RenderedComponent = !onPress ? View : Touchable;

    return (
      <RenderedComponent
        useForeground={ripple.useForeground}
        background={Touchable.Ripple(ripple.pressColor, ripple.borderless)}
        onPress={onPress}
        hitSlop={BUTTON_HIT_SLOP}
        style={[styles.buttonContainer, buttonWrapperStyle]}
        testID={testID}
      >
        <View>{ButtonElement}</View>
      </RenderedComponent>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
