/**
 * @flow
 */
import * as React from 'react';
const BUTTON_HIT_SLOP = { top: 5, bottom: 5, left: 5, right: 5 };
import { StyleSheet, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

// from <Item />
export type HeaderButtonProps = {
  onPress: ?() => any,
  buttonWrapperStyle?: ViewStyleProp,
  ButtonElement?: React.Element<any>,
  testID?: string,
};

// props that pertain to styling of visible buttons
// these are partially passed from <Item /> and partially supplied by you, the developer when you wrap <HeaderButton />
export type VisibleButtonProps = $Exact<{
  iconName?: string,
  title: string,
  buttonStyle?: ViewStyleProp,

  IconComponent?: React.ComponentType<*>,
  iconSize?: number,
  color?: string,
}>;

type OtherProps = {
  background: any,
  getButtonElement: VisibleButtonProps => React.Element<any>,
};

type Props = {
  ...$Exact<HeaderButtonProps>,
  ...$Exact<VisibleButtonProps>,
  ...$Exact<OtherProps>,
};

export class HeaderButton extends React.PureComponent<Props> {
  static defaultProps = {
    background: Touchable.Ripple('rgba(0, 0, 0, .32)', true),
  };

  render() {
    const {
      onPress,
      buttonWrapperStyle,
      testID,
      getButtonElement,
      ButtonElement: ButtonElementOverride,
      background,
      iconName,
      title,
      buttonStyle,
      IconComponent,
      iconSize,
      color,
      ...other
    } = this.props;

    const ButtonElement =
      ButtonElementOverride ||
      getButtonElement({ iconName, title, buttonStyle, IconComponent, iconSize, color });

    return (
      <Touchable
        background={background}
        disabled={!onPress}
        onPress={onPress}
        hitSlop={BUTTON_HIT_SLOP}
        style={[styles.buttonContainer, buttonWrapperStyle]}
        testID={testID}
        {...other}
      >
        <View>{ButtonElement}</View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
