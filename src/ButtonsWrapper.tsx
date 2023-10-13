import * as React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
/*
 * the `left` prop can be provided to HeaderButtons as well as OverflowMenu
 * this will render some extra margins on the corresponding side
 * but must be considered only once which is the job of this Context
 * */

export const ButtonsExtraMarginContext = React.createContext<
  'toBeHandled' | 'alreadyHandled'
>('toBeHandled');

export type ButtonsWrapperProps = {
  left?: boolean;
  // when rendered as a header for a tab navigator, the margins that native stack adds are not there,
  // so we need to add margins manually
  preset?: 'tabHeader' | 'stackHeader';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const ButtonsWrapper = ({
  left,
  children,
  style,
  preset = 'stackHeader',
}: ButtonsWrapperProps) => {
  const marginStatus = React.useContext(ButtonsExtraMarginContext);
  const extraSideMargin =
    preset === 'tabHeader' || marginStatus === 'toBeHandled'
      ? getHeaderMargin(left)
      : undefined;

  return (
    <ButtonsExtraMarginContext.Provider value="alreadyHandled">
      <View style={[styles.row, extraSideMargin, style]}>{children}</View>
    </ButtonsExtraMarginContext.Provider>
  );
};

export const getHeaderMargin = (left: boolean = false) => {
  return left ? styles.extraEdgeMarginOnLeft : styles.extraEdgeMarginOnRight;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...Platform.select({
      android: {
        columnGap: 18,
      },
      default: {
        columnGap: 24,
      },
    }),
  },
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
        marginRight: 14,
      },
      default: {
        marginRight: 15,
      },
    }),
  },
});
