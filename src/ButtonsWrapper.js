// @flow
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

type Props = {|
  left: boolean | null,
  children: React.Node,
|};

export const ButtonsWrapper = ({ left, children }: Props) => {
  const extraSideMargin = getMargin(left);
  return <View style={StyleSheet.compose(styles.row, extraSideMargin)}>{children}</View>;
};

const getMargin = (left) => {
  if (left === null) {
    return undefined;
  }
  return left ? styles.extraEdgeMarginOnLeft : styles.extraEdgeMarginOnRight;
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center' },
  extraEdgeMarginOnLeft: {
    ...Platform.select({
      android: {
        marginLeft: 5,
      },
      default: {
        marginLeft: 4,
      },
    }),
  },
  extraEdgeMarginOnRight: {
    ...Platform.select({
      android: {
        marginRight: 4,
      },
      default: {
        marginRight: 5,
      },
    }),
  },
});
