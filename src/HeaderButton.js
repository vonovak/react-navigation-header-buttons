/**
 * @flow
 */
import * as React from 'react';
const BUTTON_HIT_SLOP = { top: 5, bottom: 5, left: 5, right: 5 };
import { StyleSheet, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

// from <Item />
export type HeaderButtonProps = {
  onPress: ?() => any,
  buttonWrapperStyle?: StyleObj,
  ButtonElement?: React.Element<any>,
  testID?: string,
};

// props that pertain to styling of visible buttons
// these are partially passed from <Item /> and partially supplied by you, the developer when you wrap <HeaderButton />
export type VisibleButtonProps = $Exact<{
  iconName?: string,
  title: string,
  buttonStyle?: StyleObj,

  IconComponent?: React.ComponentType<*>,
  iconSize?: number,
  color?: string,
}>;

type OtherProps = {
  touchableBackground: any,
  getButtonElement: VisibleButtonProps => React.Element<any>,
};

export class HeaderButton extends React.PureComponent<
  HeaderButtonProps & VisibleButtonProps & OtherProps
> {
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
