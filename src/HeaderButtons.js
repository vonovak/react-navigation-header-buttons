/*
 * @flow
 */
import * as React from 'react';
import { HeaderButton } from './HeaderButton';
import { StyleSheet, Platform, View } from 'react-native';
import { HeaderButtonsContext } from './HeaderButtonsContext';

type HeaderButtonsProps = {|
  children: React.Node,
  left: boolean,
  HeaderButtonComponent: React.ComponentType<any>,
|};

export function HeaderButtons(props: HeaderButtonsProps) {
  const { HeaderButtonComponent, children } = props;

  const edgeMargin = props.left ? styles.extraEdgeMarginOnLeft : styles.extraEdgeMarginOnRight;

  return (
    <HeaderButtonsContext.Provider value={HeaderButtonComponent}>
      <View style={[styles.row, edgeMargin]}>{children}</View>
    </HeaderButtonsContext.Provider>
  );
}

HeaderButtons.defaultProps = {
  left: false,
  HeaderButtonComponent: HeaderButton,
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
