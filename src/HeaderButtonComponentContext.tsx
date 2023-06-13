import * as React from 'react';
import { HeaderButton, type HeaderButtonProps } from './HeaderButton';

export type HeaderButtonsComponentType = React.ComponentType<HeaderButtonProps>;
export const HeaderButtonComponentContext =
  React.createContext<HeaderButtonsComponentType>(HeaderButton);
