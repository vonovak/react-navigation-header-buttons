// @flow
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import TouchableItem from '../../TouchableItem';

export type Props = {
  /**
   * Title text for the `MenuItem`.
   */
  title: string,
  /**
   * Icon to display for the `MenuItem`.
   */
  icon?: ?React.Node,
  /**
   * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean,
  /**
   * Function to execute on press.
   */
  onPress: ?() => any,
  /**
   * @optional
   */
  style?: ViewStyleProp,
  titleStyle?: ViewStyleProp,
  /**
   * TestID used for testing purposes
   */
  testID?: string,
};

/**
 * A component to show a single list item inside a Menu.
 */

export class MenuItem extends React.Component<Props> {
  render(): React.Element<typeof MenuItem> {
    const { icon, title, disabled, onPress, style, titleStyle, testID } = this.props;

    const titleColor = disabled ? styles.disabledColor : styles.normalColor;

    return (
      <TouchableItem
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}
        testID={testID}
      >
        <View style={styles.row}>
          {React.isValidElement(icon) && (
            <View style={[styles.item, styles.icon]} pointerEvents="box-none">
              {icon}
            </View>
          )}
          <View
            style={[styles.item, styles.content, icon != null ? styles.widthWithIcon : undefined]}
            pointerEvents="none"
          >
            <Text numberOfLines={1} style={[styles.title, titleColor, titleStyle]}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableItem>
    );
  }
}

const minWidth = 112;
const maxWidth = 280;
const iconWidth = 25;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    minWidth,
    maxWidth,
    height: 48,
    justifyContent: 'center',
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
    marginHorizontal: 8,
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
