import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

type Props = ViewProps & {
  inset?: boolean;
};

/**
 * A divider is a thin, lightweight separator that groups content in lists and page layouts.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Divider, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Text>Apple</Text>
 *     <Divider />
 *     <Text>Orange</Text>
 *     <Divider />
 *   </View>
 * );
 *
 * ```
 */
export function Divider(props: Props) {
  const { dark } = useTheme();
  const { inset, style, ...rest } = props;
  const textStyle = dark ? styles.dark : styles.light;
  return <View {...rest} style={[textStyle, inset && styles.inset, style]} />;
}

const styles = StyleSheet.create({
  light: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    height: StyleSheet.hairlineWidth,
  },
  dark: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    height: StyleSheet.hairlineWidth,
  },
  inset: {
    marginLeft: 72,
  },
});
