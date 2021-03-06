// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

type Props = {
  ...ViewProps,
  inset?: boolean,
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
export function Divider(props: Props): React.Element<typeof View> {
  const { inset, style, ...rest } = props;
  return <View {...rest} style={[styles.light, inset && styles.inset, style]} />;
}

const styles = StyleSheet.create({
  light: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    height: StyleSheet.hairlineWidth,
  },
  inset: {
    marginLeft: 72,
  },
});
