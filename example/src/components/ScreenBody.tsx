import * as React from 'react';
import { View } from 'react-native';

export type ScreenBodyProps = { children?: React.ReactNode };
export const ScreenBody = ({ children }: ScreenBodyProps) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 20,
      }}
    >
      {children}
    </View>
  );
};
