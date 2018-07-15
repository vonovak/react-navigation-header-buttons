/**
 * @flow
 */
import * as React from 'react';
const BUTTON_HIT_SLOP = { top: 5, bottom: 5, left: 5, right: 5 };
import { StyleSheet, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type HeaderButtonProps = {
  onPress: ?() => any,
  buttonWrapperStyle?: StyleObj,
  ButtonElement?: React.Element<any>,
  testID?: string,
};

export type VisibleButtonProps = {
  iconName?: string,
  title: string,
  buttonStyle?: StyleObj,
  IconComponent?: React.ComponentType<*>,
  iconSize?: number,
  color?: string,
};

type OptionalProps = {
  touchableBackground: any,
  getButtonElement: VisibleButtonProps => React.Element<any>,
  ...$Exact<VisibleButtonProps>,
};

export class HeaderButton extends React.PureComponent<HeaderButtonProps & OptionalProps> {
  static defaultProps = {
    touchableBackground: Touchable.SelectableBackgroundBorderless(),
  };
  render() {
    const {
      onPress,
      buttonWrapperStyle,
      testID,
      getButtonElement,
      ButtonElement: ButtonElementOverride,
      touchableBackground,
    } = this.props;

    const { iconName, title, buttonStyle, IconComponent, iconSize, color } = this.props;

    const ButtonElement =
      ButtonElementOverride ||
      getButtonElement({ iconName, title, buttonStyle, IconComponent, iconSize, color });

    const RenderedComponent = !onPress ? View : Touchable;
    return (
      <RenderedComponent
        background={touchableBackground}
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
