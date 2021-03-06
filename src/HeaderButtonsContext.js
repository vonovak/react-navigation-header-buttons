// @flow
import * as React from 'react';
import { HeaderButton } from './HeaderButton';

export const HeaderButtonsContext: any = React.createContext<React.ComponentType<any>>(
  HeaderButton
);
