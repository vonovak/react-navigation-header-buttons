import * as React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';

import { useTheme } from '@react-navigation/native';

export type Props = {
  /**
   * Title text for the `MenuItem`.
   */
  title: string;
  /**
   * Icon to display for the `MenuItem`.
   */
  icon?: React.ReactNode | undefined;
  /**
   * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: null | ((params?: GestureResponderEvent) => void) | undefined;
  /**
   * @optional
   */
  style?: ViewStyle;
  titleStyle?: TextStyle;
  /**
   * TestID used for testing purposes
   */
  testID?: string;
};

/**
 * A component to show a single list item inside a Menu.
 */
export function MenuItem(props: Props) {
  const { icon, title, disabled, onPress, style, titleStyle, testID } = props;

  const {
    dark,
    colors: { text },
  } = useTheme();

  const disabledColor = dark ? styles.darkDisabled : styles.lightDisabled;
  const titleColor = disabled ? disabledColor : { color: text };
  const themePressColorAndroid = dark
    ? 'rgba(255, 255, 255, .32)'
    : 'rgba(0, 0, 0, .32)';

  return (
    <PlatformPressable
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      pressColor={themePressColorAndroid}
    >
      <View style={styles.row}>
        {React.isValidElement(icon) && (
          <View style={[styles.item, styles.icon]} pointerEvents="box-none">
            {icon}
          </View>
        )}
        <View
          style={[
            styles.item,
            styles.content,
            icon != null ? styles.widthWithIcon : undefined,
          ]}
          pointerEvents="none"
        >
          <Text
            selectable={false}
            numberOfLines={1}
            style={[styles.title, titleColor, titleStyle]}
          >
            {title}
          </Text>
        </View>
      </View>
    </PlatformPressable>
  );
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
  lightDisabled: {
    color: 'rgba(0, 0, 0, 0.32)',
  },
  darkDisabled: {
    color: 'rgba(255, 255, 255, 0.32)',
  },
});
