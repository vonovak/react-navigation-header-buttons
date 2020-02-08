// @flow
import * as React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import Touchable from 'react-native-platform-touchable';

type Props = {|
  ...$Exact<React.ElementConfig<typeof TouchableWithoutFeedback>>,
  /**
   * Title text for the `MenuItem`.
   */
  title: React.Node | string,
  /**
   * Icon to display for the `MenuItem`.
   */
  icon?: React.Node,
  /**
   * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean,
  /**
   * Function to execute on press.
   */
  onPress: ?() => void,
  /**
   * @optional
   */
  style?: ViewStyleProp,
|};

/**
 * A component to show a single list item inside a Menu.
 *
 */
const rippleConfig = Touchable.Ripple('rgba(0, 0, 0, .32)', true);

export class MenuItem extends React.Component<Props> {
  render() {
    const { icon, title, disabled, onPress, style } = this.props;

    const titleColor = disabled ? styles.disabledColor : styles.normalColor;

    return (
      <Touchable
        background={rippleConfig}
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.row}>
          {React.isValidElement(icon) && (
            <View style={[styles.item, styles.icon]} pointerEvents="box-none">
              {icon}
            </View>
          )}
          <View
            style={[styles.item, styles.content, icon ? styles.widthWithIcon : null]}
            pointerEvents="none"
          >
            <Text numberOfLines={1} style={[styles.title, titleColor]}>
              {title}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  }
}

const minWidth = 112;
const maxWidth = 280;
const iconWidth = 40;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    minWidth,
    maxWidth,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: iconWidth,
  },
  title: {
    fontSize: 16,
  },
  item: {
    margin: 8,
  },
  content: {
    justifyContent: 'center',
    minWidth: minWidth - 16,
    maxWidth: maxWidth - 16,
  },
  widthWithIcon: {
    maxWidth: maxWidth - (iconWidth + 48),
  },
  disabledColor: {
    color: 'rgba(0, 0, 0, 0.32)',
  },
  normalColor: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
});
