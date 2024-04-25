import * as React from 'react';
import { ButtonsExtraMarginContext } from '../ButtonsWrapper';
import { HeaderButtonsProviderProps } from './HeaderButtonsProviderTypes';

export const HeaderButtonsProviderPlain = ({
  children,
  stackType,
}: HeaderButtonsProviderProps) => {
  const extraMarginValue =
    stackType === 'native' ? 'alreadyHandled' : 'toBeHandled';

  return (
    <ButtonsExtraMarginContext.Provider value={extraMarginValue}>
      {React.Children.only(children)}
    </ButtonsExtraMarginContext.Provider>
  );
};
