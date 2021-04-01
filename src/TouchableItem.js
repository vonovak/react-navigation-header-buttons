import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  type ViewProps,
} from 'react-native';

type Props = {
  ...ViewProps,
  pressColor?: string,
  disabled?: boolean,
  borderless?: boolean,
  delayPressIn?: number,
  onPress?: () => void,
  children: React.Node,
};

const ANDROID_VERSION_LOLLIPOP = 21;
const CAN_USE_RIPLLE = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;

export default function TouchableItem({
  borderless = false,
  pressColor = 'rgba(0, 0, 0, .32)',
  rippleRadius,
  style,
  children,
  ...rest
}: Props) {
  const background = React.useMemo(() => {
    return CAN_USE_RIPLLE
      ? TouchableNativeFeedback.Ripple(pressColor, borderless, rippleRadius)
      : undefined;
  }, [pressColor, borderless, rippleRadius]);
  /*
   * TouchableNativeFeedback.Ripple causes a crash on old Android versions,
   * therefore only enable it on Android Lollipop and above.
   *
   * All touchables on Android should have the ripple effect according to
   * platform design guidelines.
   * We need to pass the background prop to specify a borderless ripple effect.
   */
  if (CAN_USE_RIPLLE) {
    return (
      <TouchableNativeFeedback
        {...rest}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        background={background}
      >
        <View style={style}>{React.Children.only(children)}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity style={style} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
}
