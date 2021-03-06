// @flow
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

/*
 * the `left` prop can be provided to HeaderButtons as well as OverflowMenu
 * this will render some extra margins on the corresponding side
 * but must be considered only once which is the job of this Context
 * */

const ButtonsExtraMarginContext = React.createContext<
  'toBeHandledByOverflowMenu' | 'alreadyHandledByHeaderButtons'
>('toBeHandledByOverflowMenu');

type Props = {
  left: boolean,
  children: React.Node,
};

export const ButtonsWrapper = ({ left, children }: Props): any => {
  const marginStatus = React.useContext(ButtonsExtraMarginContext);
  const valueOfLeft = marginStatus === 'alreadyHandledByHeaderButtons' ? null : left;
  const extraSideMargin = getMargin(valueOfLeft);

  return (
    <ButtonsExtraMarginContext.Provider value="alreadyHandledByHeaderButtons">
      <View style={StyleSheet.compose(styles.row, extraSideMargin)}>{children}</View>
    </ButtonsExtraMarginContext.Provider>
  );
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
