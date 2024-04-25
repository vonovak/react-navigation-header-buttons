import { ReactElement } from 'react';

export type HeaderButtonsProviderProps = {
  children: ReactElement;
  stackType: 'native' | 'js';
  spaceAboveMenu?: number;
};
